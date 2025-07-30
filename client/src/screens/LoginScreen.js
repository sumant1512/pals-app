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
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import ErrorModal from "../components/PalsErrorModal";
import PalsTouchableButton from "../components/PalsTouchableButton";
import PalsTextInput from "../components/PalsTextInput";
import PalsOtpInput from "../components/PalsOtpInput";

import { serverDomain } from "../constants/Config";

const LoginScreen = () => {
  const [errorVisible, setErrorVisible] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [showOtpInput, setShowOtpInput] = useState(false);
  const navigation = useNavigation();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      mobile: "9111097770",
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

  const setOpenedScreen = async (screenName) => {
    try {
      await AsyncStorage.setItem("openedScreen", screenName);
    } catch (e) {
      console.error(e);
    }
  };

  const onLoginPressed = (data) => {
    const { otp, mobile } = data;

    fetch(`${serverDomain}/api/auth/send-otp`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        mobile,
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
          setShowOtpInput(true);
        }
      })
      .catch((error) => {
        console.error("API Error:", error);
        setErrorMsg(JSON.parse(error.message).message);
        setErrorVisible(true);
      });
  };

  const verifyUser = (data) => {
    fetch(`${serverDomain}/api/auth/verify`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((responseData) => {
        if (responseData.status) {
          setAuthTokenToStorage(responseData?.authToken);
          setOpenedScreen("user");
          navigation.navigate("Dealer");
        } else {
          console.error(
            "[AccountLoginScreen - verify otp] API Error:",
            responseData
          );
          setErrorMsg(responseData.message);
          setErrorVisible(true);
        }
      })
      .catch((error) => {
        console.error("[AccountLoginScreen - verify otp] API Error:", error);
        setErrorMsg(error);
        setErrorVisible(true);
      });
  };

  return (
    <ImageBackground
      source={require("../assets/login_bg.png")} // 🔁 replace with your image
      style={styles.background}
      resizeMode="cover"
    >
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <Image
          source={require("../assets/pals_paint.png")} // 🔁 replace with your logo
          style={styles.logo}
          resizeMode="contain"
        />

        <View style={styles.card}>
          <Text style={styles.title}>{showOtpInput ? "Verify" : "Login"}</Text>
          <Text style={styles.subtitle}>
            If you face any trouble please contact Pals’ Paint
          </Text>

          {!showOtpInput ? (
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
            label={showOtpInput ? "Verify" : "Get OTP"}
            onPress={
              showOtpInput
                ? handleSubmit(verifyUser)
                : handleSubmit(onLoginPressed)
            }
          />
        </View>
      </KeyboardAvoidingView>

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
    width: 200,
    height: 80,
  },
  card: {
    width: "100%",
    backgroundColor: "white",
    borderTopStartRadius: 20,
    borderTopEndRadius: 20,
    padding: 20,
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
  label: {
    fontSize: 14,
    color: "#748390",
    marginBottom: 5,
  },
  input: {
    height: 48,
    borderWidth: 1,
    borderColor: "#85B9D7",
    color: "#014589",
    borderRadius: 8,
    paddingHorizontal: 12,
    fontSize: 16,
    marginBottom: 20,
  },
});
