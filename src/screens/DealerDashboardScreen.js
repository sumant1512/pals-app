import React, { useState } from "react";
import { View, Text, StyleSheet, ImageBackground } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

import UserHeader from "../components/UserHeader";
import HeaderOverlay from "../components/HeaderOverlay";
import UserRedeemModal from "./UserRedeemModal";
import ErrorModal from "../components/PalsErrorModal";
import PalsTouchableButton from "../components/PalsTouchableButton";
import { BE_PATH, VERIFICATION_APP_ID } from "../constants/Config";

const DealerDashboardScreen = ({ userInfo, addCouponPressed }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [errorVisible, setErrorVisible] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const onRedeemNowPressed = () => {
    setModalVisible(true);
  };

  const closeModal = () => setModalVisible(false);

  const setOpenedScreen = async () => {
    try {
      await AsyncStorage.setItem("openedScreen", "login");
    } catch (e) {
      console.error(e);
    }
  };

  const clearStorage = async () => {
    try {
      await AsyncStorage.multiRemove(["authToken", "userInfo"]);
    } catch (e) {
      console.error(e);
    }
  };

  const onRedeemConfirm = async () => {
    setModalVisible(false);
    const token = await AsyncStorage.getItem("authToken");
    if (!token) {
      await clearStorage();
      await setOpenedScreen();
      navigation.navigate("Login");
      return;
    }

    axios
      .post(
        `${BE_PATH}/api/mobile/v1/points/redeem`,
        {
          points: parseInt(parseInt(userInfo?.points?.available)),
        },
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
            "X-App-Id": VERIFICATION_APP_ID,
          },
        },
      )
      .then((res) => {
        console.log("Redeemed:", res.data);
      })
      .catch((err) => {
        console.error("Redeem Error:", err);
        setErrorMsg(err?.response?.data?.message || "Redeem failed");
        setErrorVisible(true);
      });
  };

  return (
    <ImageBackground
      source={require("../assets/dealer_dashboard_bg.png")}
      style={styles.background}
      resizeMode="cover"
    >
      <HeaderOverlay />
      <UserHeader />
      <View style={styles.container}>
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>Pals Balance</Text>
            <Text style={styles.currencyIcon}>₹</Text>
          </View>
          <Text style={styles.amount}>
            ₹ {userInfo?.points?.available || 0}
          </Text>

          <View style={styles.divider} />

          <View style={styles.rowBetween}>
            <Text style={styles.label}>Credited</Text>
            <Text style={styles.labelAmount}>
              ₹{userInfo?.points?.credited || 0}
            </Text>
          </View>

          <View style={styles.rowBetween}>
            <Text style={styles.label}>Redeemed</Text>
            <Text style={styles.labelAmount}>
              ₹{userInfo?.points?.redeemed || 0}
            </Text>
          </View>

          <View style={styles.rowBetween}>
            <Text style={styles.label}>Locked Credit</Text>
            <Text style={styles.labelAmount}>
              ₹{userInfo?.points?.locked || 0}
            </Text>
          </View>

          <PalsTouchableButton
            label="Redeem Now"
            theme="light"
            onPress={onRedeemNowPressed}
            style={styles.redeemButton}
          />
        </View>

        <UserRedeemModal
          isVisible={modalVisible}
          redemmablePoints={parseInt(userInfo?.points?.available)}
          closeModal={closeModal}
          confirmModal={onRedeemConfirm}
        />

        <ErrorModal
          visible={errorVisible}
          message={errorMsg}
          onClose={() => setErrorVisible(false)}
        />
      </View>
    </ImageBackground>
  );
};

export default DealerDashboardScreen;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: "100%",
    height: 370,
  },
  container: {
    flex: 1,
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  logo: {
    width: 150,
    height: 60,
    alignSelf: "center",
  },
  card: {
    backgroundColor: "rgba(0, 19, 51, 0.4)",
    backdropFilter: "blur(10px)",
    padding: 20,
    borderRadius: 16,
    borderColor: "#ccc",
    borderWidth: 0.5,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  cardTitle: {
    fontSize: 18,
    color: "#fff",
  },
  currencyIcon: {
    fontSize: 28,
    color: "#fff",
    fontWeight: 700,
    opacity: 0.3,
  },
  amount: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#fff",
    marginVertical: 10,
  },
  divider: {
    height: 1,
    backgroundColor: "#ccc",
    opacity: 0.5,
    marginVertical: 10,
  },
  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 6,
  },
  label: {
    color: "#fff",
    fontSize: 14,
  },
  labelAmount: {
    color: "#fff",
    fontSize: 14,
  },
  redeemButton: {
    marginTop: 16,
  },
  tabBarContainer: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingVertical: 10,
  },
  scanNowButton: {
    position: "absolute",
    bottom: 20,
    left: "42%",
  },
});
