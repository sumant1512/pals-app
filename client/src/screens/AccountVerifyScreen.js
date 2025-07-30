import { useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { useForm } from "react-hook-form";
import { useNavigation, useRoute } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import PalsTouchableButton from "../components/PalsTouchableButton";
import PalsTextInput from "../components/PalsTextInput";
import ErrorModal from "../components/PalsErrorModal";
import Logo from "../components/Logo";
import PalsText from "../components/PalsText";
import PalsUrl from "../components/PalsUrl";
import { serverDomain } from "../constants/Config";

export default function AccountVerifyScreen() {
  const [loading, setLoading] = useState(true);
  const [errorVisible, setErrorVisible] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const navigation = useNavigation();
  const route = useRoute();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
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

  const verifyAccount = (data) => {
    console.log("Cliecked");
    fetch(`${serverDomain}/api/auth/verify`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        mobile: route?.params?.mobile,
        otp: data.otp,
      }),
    })
      .then((response) => response.json())
      .then((responseData) => {
        if (responseData.status) {
          setAuthTokenToStorage(responseData?.authToken);
          setOpenedScreen("user");
          navigation.navigate("Dealer");
        } else {
          console.error(
            "[AccountVerifyScreen - verify otp] API Error:",
            responseData
          );
          setErrorMsg(responseData.message);
          setErrorVisible(true);
        }
      })
      .catch((error) => {
        console.error("[AccountVerifyScreen - verify otp] API Error:", error);
        setErrorMsg(error);
        setErrorVisible(true);
      });
  };

  const onResendOTPPressed = () => {
    fetch(`${serverDomain}/api/auth/sendOtp`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        mobile: route?.params?.mobile,
      }),
    })
      .then((response) => response.json())
      .then((responseData) => {})
      .catch((error) => console.error(error));
  };

  const onBackButtonPressed = () => {
    navigation.goBack();
  };

  const navigateToSignIn = () => {
    navigation.push("Login");
  };

  return (
    <View style={styles.container}>
      <Logo bottom={40}></Logo>
      <PalsText label="Verify" type="h1"></PalsText>
      <PalsTextInput
        name="otp"
        placeholder="OTP"
        control={control}
        rules={{ required: "OTP is required." }}
      />

      <View style={styles.resendOtp}>
        <PalsUrl label="Resend OTP" action={onResendOTPPressed}></PalsUrl>
      </View>

      <View style={styles.verifyBtn}>
        <PalsTouchableButton
          label="Verify"
          theme="dark"
          onPress={handleSubmit(verifyAccount)}
        />
      </View>

      <PalsTouchableButton
        label="Back"
        theme="outlined"
        onPress={onBackButtonPressed}
      />

      <View style={styles.signInLine}>
        <Text>
          Already have an account?{" "}
          <Text style={styles.signIn} onPress={navigateToSignIn}>
            Sign in
          </Text>
        </Text>
      </View>

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
    paddingVertical: 40,
    justifyContent: "center",
  },
  verifyBtn: { marginTop: 20 },
  resendOtp: { alignSelf: "flex-end", marginTop: 8 },
  signInLine: {
    alignSelf: "center",
    marginTop: 20,
    marginBottom: 30,
  },
  signIn: {
    fontWeight: "bold",
  },
});
