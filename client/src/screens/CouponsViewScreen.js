import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

import UserHeader from "../components/UserHeader";
import BackButton from "../components/BackButton";
import ErrorModal from "../components/PalsErrorModal";
import CouponCard from "./CouponCard";
import { serverDomain } from "../constants/Config";

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

const profilePressed = () => {
  navigation.navigate("AdminProfile");
};

export default function QRsScreen() {
  const [loading, setLoading] = useState(true);
  const [errorVisible, setErrorVisible] = useState(false);
  const [qrList, setQrList] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");

  useFocusEffect(
    React.useCallback(() => {
      getCoupons();
    }, [])
  );

  const getCoupons = () => {
    (() => {
      AsyncStorage.getItem("authToken").then((authToken) => {
        if (authToken) {
          const headers = {
            Accept: "application/json",
            "Content-Type": "application/json",
            authorization: `Bearer ${authToken}`,
          };
          axios
            .get(`${serverDomain}/api/coupon/get`, { headers })
            .then((couponResponse) => {
              console.log("Coupons Response:", couponResponse);
              setQrList(couponResponse?.data?.coupons);
              setLoading(false);
            })
            .catch((error) => {
              console.error("API Error:", error);
              setErrorMsg(
                error?.response?.data?.message
                  ? error?.response?.data?.message
                  : error?.response?.statusText
              );
              setErrorVisible(true);
              setLoading(false);
            });
        } else {
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
    <View style={styles.container}>
      <UserHeader action={profilePressed} />
      <BackButton />

      {loading ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color="#007bff" />
        </View>
      ) : (
        <ScrollView>
          <Text style={styles.title}>Coupons</Text>
          <View style={styles.grid}>
            {qrList?.map((qr) => (
              <CouponCard key={qr._id} {...qr} />
            ))}
          </View>
        </ScrollView>
      )}

      <ErrorModal
        visible={errorVisible}
        message={errorMsg}
        onClose={() => setErrorVisible(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 40,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#00206F",
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff", // Optional: matches your design
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingHorizontal: 0,
  },
});
