import { StyleSheet, Text, View } from "react-native";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import PalsText from "../components/PalsText";
import PalsTextInput from "../components/PalsTextInput";
import TouchableButton from "../components/PalsTouchableButton";
import Logo from "../components/Logo";
import { MOBILE_REGEX } from "../helpers/regex";
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
      mobile: "9131410942",
    },
  });

  const onLoginPressed = (data) => {
    fetch(`${serverDomain}/api/auth/sendOtp`, {
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
          navigation.navigate("AccountVerifyScreen", {
            mobile: data.mobile,
          });
        }
      })
      .catch((error) => {
        console.error("API Error:", error.message);
      });
  };

  const navigateToSignUp = () => {
    navigation.push("AccountCreateScreen");
  };

  return (
    <View style={styles.container}>
      <Logo bottom={40}></Logo>
      <PalsText label="Log in" type="h1"></PalsText>

      <PalsTextInput
        name="mobile"
        placeholder="Mobile number"
        control={control}
        rules={{
          required: "Mobile is required.",
          pattern: {
            value: MOBILE_REGEX,
            message: "Invalid mobile number.",
          },
        }}
      />

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
