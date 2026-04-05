import React, { useState } from "react";
import { StyleSheet, View, Text, ActivityIndicator } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import axios from "axios";

import ErrorModal from "../components/PalsErrorModal";
import PalsLoaderCard from "./../components/PalsLoaderCard";
import DealerDashboardScreen from "./DealerDashboardScreen";
import { BE_PATH, VERIFICATION_APP_ID } from "../constants/Config";

export default function DashboardScreen({ navigation }) {
  const [loading, setLoading] = useState(true);
  const [errorVisible, setErrorVisible] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [userAuthToken, setUserAuthToken] = useState("");
  const [userInfo, setUserInfo] = useState({});

  const addCouponPressed = () => {
    navigation.getParent()?.navigate("ScanCoupon");
  };

  const setUserInfoToAsyncStorage = async (userInfo) => {
    try {
      await AsyncStorage.setItem("userInfo", userInfo);
    } catch (e) {
      console.error(e);
    }
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

  const resetToLogin = async () => {
    setOpenedScreen();
    clearAuthStorage();
    clearUserInfoStorage();
    navigation.navigate("Login");
  };

  useFocusEffect(
    React.useCallback(() => {
      getUserInfo();
    }, [])
  );

  const getUserInfo = () => {
    (() => {
      AsyncStorage.getItem("authToken").then((authToken) => {
        if (authToken) {
          setUserAuthToken(authToken);
          const headers = {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
            "X-App-Id": VERIFICATION_APP_ID,
          };
          axios
            .get(`${BE_PATH}/api/mobile/v1/auth/me`, { headers })
            .then((userInfoResponse) => {
              // navigation.navigate(userInfoResponse?.data?.role);
              setUserInfo(userInfoResponse?.data?.data);
              setUserInfoToAsyncStorage(
                JSON.stringify(userInfoResponse?.data?.data)
              );
              setLoading(false);
            })
            .catch((error) => {
              setLoading(false);
              console.error("API Error:", error);
              if (error.status === 401) {
                resetToLogin();
              }
              setErrorMsg(
                error?.response?.data?.message || "Failed to load user info."
              );
              setErrorVisible(true);
            });
        } else {
          setLoading(false);
          resetToLogin();
        }
      });
    })();
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <PalsLoaderCard />
      ) : (
        <>
          {/* Dealer Dashboard */}
          <DealerDashboardScreen
            userInfo={userInfo}
            addCouponPressed={addCouponPressed}
          />
        </>
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
  },
});
