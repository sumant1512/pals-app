import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigation } from "@react-navigation/native";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import ErrorModal from "../components/PalsErrorModal";
import PalsTouchableButton from "../components/PalsTouchableButton";
import PalsTextInput from "../components/PalsTextInput";
import PalsOtpInput from "../components/PalsOtpInput";
import HeaderOverlay from "../components/HeaderOverlay";

import { BE_PATH } from "../constants/Config";

const LoginScreen = () => {
  const [errorVisible, setErrorVisible] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [isVerifyScreen, setIsVerifyScreen] = useState(false);
  const navigation = useNavigation();
  const {
    control,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: {
      mobile: "",
      otp: "",
    },
  });

  const setAuthTokenToStorage = async (token) => {
    try {
      await AsyncStorage.setItem("authToken", token);
    } catch (e) {
      console.error(e);
    }
  };

  const setRefreshTokenToStorage = async (token) => {
    try {
      await AsyncStorage.setItem("refreshToken", token);
    } catch (e) {
      console.error(e);
    }
  };

  const setOpenedScreen = async (screenName) => {
    try {
      await AsyncStorage.setItem("openedScreen", screenName);
    } catch (e) {
      console.error(e);
    }
  };

  const onLoginPressed = () => {
    const { mobile } = getValues();

    fetch(`${BE_PATH}/api/mobile/v1/auth/request-otp`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        phone_e164: mobile,
        device: Platform.OS,
      }),
    })
      .then((response) => {
        if (response.status != 200) {
          return response.text().then((errorData) => {
            throw new Error(errorData);
          });
        }
        return response.json();
      })
      .then((responseData) => {
        if (responseData.status) {
          setIsVerifyScreen(true);
        }
      })
      .catch((error) => {
        console.error("API Error:", error);
        let finalError = "Something went wrong";

        try {
          const parsed = JSON.parse(error.message);
          finalError = parsed.message || error.message;
        } catch (e) {}
        setErrorMsg(finalError.toString());
        setErrorVisible(true);
      });
  };

  const verifyUser = (data) => {
    const requestData = {
      phone_e164: data.mobile,
      otp: data.otp,
      device: Platform.OS,
    };
    fetch(`${BE_PATH}/api/mobile/v1/auth/verify-otp`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestData),
    })
      .then((response) => response.json())
      .then((responseData) => {
        if (responseData.status) {
          setAuthTokenToStorage(responseData?.data?.accessToken);
          setRefreshTokenToStorage(responseData?.data?.refreshToken);
          setOpenedScreen("user");
          navigation.navigate("Dealer");
        } else {
          setErrorMsg(responseData.message);
          setErrorVisible(true);
        }
      })
      .catch((error) => {
        console.error("[AccountLoginScreen - verify otp] API Error:", error);
        setErrorMsg(error.message || "Something went wrong");
        setErrorVisible(true);
      });
  };

  return (
    <ImageBackground
      source={require("../assets/login_bg.png")}
      style={styles.background}
      resizeMode="cover"
    >
      <HeaderOverlay />

      <View style={{ flex: 1 }}>
        <ScrollView
          contentContainerStyle={styles.container}
          keyboardShouldPersistTaps="always"
          showsVerticalScrollIndicator={false}
        >
          <Image
            source={require("./../assets/circle_logo.png")}
            style={styles.logo}
            resizeMode="contain"
          />

          <View style={styles.card}>
            <Text style={styles.title}>
              {isVerifyScreen ? "Verify" : "Login"}
            </Text>
            <Text style={styles.subtitle}>
              If you face any trouble please contact Pals’ Paint
            </Text>

            {!isVerifyScreen ? (
              <PalsTextInput
                name="mobile"
                control={control}
                label="Registered Mobile no."
                placeholder="+91 9999999999"
                keyboardType="number-pad"
                maxLength={10}
                rules={{
                  required: "Mobile number is required.",
                  pattern: {
                    value: /^[6-9]\d{9}$/,
                    message: "Invalid mobile number.",
                  },
                }}
              />
            ) : (
              <PalsOtpInput
                name="otp"
                control={control}
                rules={{
                  required: "OTP is required.",
                  minLength: { value: 6, message: "Enter 6-digit OTP." },
                }}
              />
            )}

            <PalsTouchableButton
              label={isVerifyScreen ? "Verify" : "Get OTP"}
              onPress={
                isVerifyScreen ? handleSubmit(verifyUser) : onLoginPressed
              }
            />
            {isVerifyScreen && (
              <PalsTouchableButton
                label={"Resend OTP"}
                theme="text"
                style={styles.resendOtp}
                onPress={onLoginPressed}
              />
            )}
          </View>
        </ScrollView>
      </View>

      <ErrorModal
        visible={errorVisible}
        message={errorMsg}
        onClose={() => setErrorVisible(false)}
      />
    </ImageBackground>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  container: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 80,
  },
  logo: {
    height: 200,
  },
  card: {
    width: "100%",
    backgroundColor: "white",
    borderTopStartRadius: 20,
    borderTopEndRadius: 20,
    padding: 20,
    paddingBottom: 60,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  title: {
    fontSize: 24,
    color: "#014589",
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 14,
    color: "#484848",
    marginBottom: 20,
  },
  resendOtp: {
    marginTop: 10,
  },
});
