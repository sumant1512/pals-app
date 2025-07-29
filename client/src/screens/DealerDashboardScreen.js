import React, { useState } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

import TouchableButton from "../components/PalsTouchableButton";
import PalsUrl from "../components/PalsUrl";
import ErrorModal from "../components/PalsErrorModal";
import UserRedeemModal from "./UserRedeemModal";
import { serverDomain } from "../constants/Config";

const DealerDashboardScreen = ({ userInfo, addCouponPressed }) => {
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [errorVisible, setErrorVisible] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const onRedeemNowPressed = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const setOpenedScreen = async () => {
    try {
      await AsyncStorage.setItem("openedScreen", "login");
    } catch (e) {
      console.error(e);
    }
  };

  const clearAuthStorage = async () => {
    try {
      await AsyncStorage.removeItem("authToken");
    } catch (e) {
      console.error(e);
    }
  };

  const clearUserInfoStorage = async () => {
    try {
      await AsyncStorage.removeItem("userInfo");
    } catch (e) {
      console.error(e);
    }
  };

  const onRedeemConfirm = () => {
    setModalVisible(false);
    (() => {
      AsyncStorage.getItem("authToken").then((authToken) => {
        if (authToken) {
          const headers = {
            Accept: "application/json",
            "Content-Type": "application/json",
            authorization: `Bearer ${authToken}`,
          };
          axios
            .post(
              `${serverDomain}/api/coupon/redeem`,
              {
                amount: parseInt(
                  parseInt(userInfo.availableCredit / 100) * 100
                ),
              },
              { headers }
            )
            .then((userInfoResponse) => {
              console.log("Redeem confirmed", userInfoResponse);
              setLoading(false);
            })
            .catch((error) => {
              console.error("API Error:", error);
              setErrorMsg(error?.response?.data?.message);
              setErrorVisible(true);
              setLoading(false);
            });
        } else {
          setModalVisible(false);
          setOpenedScreen();
          clearAuthStorage();
          clearUserInfoStorage();
          setLoading(false);
          navigation.navigate("Login");
        }
      });
    })();
  };

  return (
    <>
      {/* Pals Credit Card */}
      <View style={styles.card}>
        <View style={styles.availableCreditRow}>
          <View style={styles.imageContainer}>
            <Image
              source={require("../assets/credit_card.png")}
              style={styles.image}
            />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.heading}>Pals' Credit</Text>
            <Text style={styles.availableCredit}>
              ₹{userInfo?.availableCredit || 0}
            </Text>
          </View>
        </View>
        <View style={styles.credit}>
          <Text style={styles.totalCredit}>
            Total: ₹{userInfo?.totalCredit || 0}
          </Text>
          <Text style={styles.totalDebit}>
            Redeemed: ₹{userInfo?.totalDebit || 0}
          </Text>
        </View>
      </View>

      <View style={styles.redeemContainer}>
        <PalsUrl label="Redeem Now" action={onRedeemNowPressed}></PalsUrl>
      </View>

      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <UserRedeemModal
          isVisible={modalVisible}
          redemmablePoints={parseInt(userInfo.availableCredit / 100) * 100}
          closeModal={closeModal}
          confirmModal={onRedeemConfirm}
        />
      </View>

      {/* Button always at bottom */}
      <View style={styles.bottomButton}>
        <TouchableButton
          label="Scan Coupon"
          theme="filled"
          action={addCouponPressed}
        />
      </View>

      <ErrorModal
        visible={errorVisible}
        message={errorMsg}
        onClose={() => setErrorVisible(false)}
      />
    </>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#00206F",
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingTop: 35,
    paddingBottom: 15,
  },
  availableCreditRow: {
    flexDirection: "row",
  },
  imageContainer: {
    flex: 1,
  },
  redeemContainer: { marginTop: 16 },
  image: {
    width: 100,
    height: 100,
    alignSelf: "center",
  },
  textContainer: {
    flex: 1,
    justifyContent: "center",
  },
  heading: {
    alignSelf: "center",
    color: "#ffffff",
    fontSize: 24,
  },
  availableCredit: {
    alignSelf: "center",
    color: "#ffffff",
    fontWeight: "bold",
    fontSize: 36,
  },
  credit: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  totalCredit: {
    color: "#ffffff",
  },
  totalDebit: {
    color: "#ffffff",
  },
  bottomButton: {
    marginTop: "auto",
    marginBottom: 20,
  },
});

export default DealerDashboardScreen;
