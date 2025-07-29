import React, { useState } from "react";
import { StyleSheet, View, Text, ActivityIndicator } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import axios from "axios";

import UserHeader from "../components/UserHeader";
import ErrorModal from "../components/PalsErrorModal";
import AdminDashboardScreen from "./AdminDashboardScreen";
import DealerDashboardScreen from "./DealerDashboardScreen";
import { serverDomain } from "../constants/Config";

export default function DashboardScreen({ navigation }) {
  const [loading, setLoading] = useState(true);
  const [errorVisible, setErrorVisible] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [userAuthToken, setUserAuthToken] = useState("");
  const [userInfo, setUserInfo] = useState({});

  const addCouponPressed = () => {
    navigation.getParent()?.navigate("ScanCoupon");
  };

  const profilePressed = () => {
    navigation
      .getParent()
      ?.navigate(
        userInfo?.userType === "Dealer" ? "DealerProfile" : "AdminProfile"
      );
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
            authorization: `Bearer ${authToken}`,
          };
          axios
            .get(`${serverDomain}/api/auth/userInfo`, { headers })
            .then((userInfoResponse) => {
              navigation.navigate(userInfoResponse?.data?.data?.userType);
              setUserInfo(userInfoResponse?.data?.data);
              setUserInfoToAsyncStorage(
                JSON.stringify(userInfoResponse?.data?.data)
              );
              setLoading(false);
            })
            .catch((error) => {
              console.error("API Error:", error);
              setErrorMsg(
                error?.response?.data?.message || "Failed to load user info."
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
      {/* Always show header */}
      <UserHeader action={profilePressed} />

      {loading ? (
        <View style={styles.loaderWrapper}>
          <ActivityIndicator size="large" color="#00206F" />
          <Text style={styles.loaderText}>Loading Dashboard...</Text>
        </View>
      ) : (
        <>
          {userInfo?.userType === "Admin" ? (
            <>
              {/* Admin Dashboard */}
              <AdminDashboardScreen />
            </>
          ) : (
            <>
              {/* Dealer Dashboard */}
              <DealerDashboardScreen
                userInfo={userInfo}
                addCouponPressed={addCouponPressed}
              />
            </>
          )}
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
    paddingHorizontal: 20,
    paddingTop: 40,
    flex: 1,
  },
  loaderWrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loaderText: {
    marginTop: 10,
    color: "#00206F",
    fontSize: 16,
  },
});
