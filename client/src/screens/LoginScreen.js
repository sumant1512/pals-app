import { StyleSheet, Text, View } from "react-native";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import PalsText from "../components/PalsText";
import PalsTextInput from "../components/PalsTextInput";
import TouchableButton from "../components/PalsTouchableButton";
import Logo from "../components/Logo";
import { PHONE_REGEX } from "../helpers/regex";
import PalsUrl from "../components/PalsUrl";
import { serverDomain } from "../constants/Config";

export default function LoginScreen() {
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      phone: "9131410942",
      pin: "5527",
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

  const resetAuth = async () => {
    try {
      await AsyncStorage.removeItem("authToken");
      setOpenedScreen("login");
      navigation.navigate("LoginScreen");
    } catch (e) {
      console.error(e);
    }
  };

  const onLoginPressed = (data) => {
    fetch(`${serverDomain}/auth/login`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...data,
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
          if (responseData?.data?.isVerified) {
            setAuthTokenToStorage(responseData?.data?.authToken);
            setOpenedScreen("user");
            navigation.navigate("UserDashboardScreen");
          } else {
            navigation.navigate("AccountVerifyScreen", {
              phone: data.phone,
            });
          }
        }
      })
      .catch((error) => {
        console.error("API Error:", error.message);
      });
  };

  const navigateToSignUp = () => {
    navigation.push("AccountCreateScreen");
  };

  const onForgotPinPressed = () => {
    navigation.push("PinForgetScreen");
  };

  return (
    <View style={styles.container}>
      <Logo bottom={40}></Logo>
      <PalsText label="Log in" type="h1"></PalsText>

      <PalsTextInput
        name="phone"
        placeholder="Mobile number"
        control={control}
        rules={{
          required: "Mobile is required.",
          pattern: {
            value: PHONE_REGEX,
            message: "Invalid mobile number.",
          },
        }}
      />

      <PalsTextInput
        name="pin"
        placeholder="Pin"
        control={control}
        rules={{
          required: "Pin is required.",
          minLength: { value: 4, message: "Min length should be 4." },
        }}
      />

      <View style={styles.forgotPin}>
        <PalsUrl label="Forgot Pin?" action={onForgotPinPressed}></PalsUrl>
      </View>

      <View style={styles.continueBtn}>
        <TouchableButton
          label="Login"
          theme="filled"
          action={handleSubmit(onLoginPressed)}
        ></TouchableButton>
      </View>

      <View style={styles.signUpLine}>
        <Text>
          Don't have an account?{" "}
          <Text style={styles.signUp} onPress={navigateToSignUp}>
            Sign up
          </Text>
        </Text>
      </View>
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
  continueBtn: { marginTop: 20 },
  signUpLine: {
    alignSelf: "center",
    marginTop: 20,
  },
  signUp: {
    fontWeight: "bold",
  },
  forgotPin: { alignSelf: "flex-end", marginTop: 8 },
});
