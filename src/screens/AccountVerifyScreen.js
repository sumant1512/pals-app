import { useState } from "react";
import { StyleSheet, View, Text } from "react-native";

import TouchableButton from "../components/PalsTouchableButton";
import PalsTextInput from "../components/PalsTextInput";
import Logo from "../components/Logo";
import PalsText from "../components/PalsText";
import PalsUrl from "../components/PalsUrl";

export default function AccountVerifyScreen({ navigation }) {
  const [otp, setOtp] = useState({
    value: "",
    error: "",
  });

  const verifyAccount = () => {
    if (otp.value) {
      fetch("http://localhost:8080/auth/verify", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          phone: "9131410942",
          otp: otp.value,
        }),
      })
        .then((response) => response.json())
        .then((responseData) => {
          console.log(JSON.stringify(responseData));
          navigation.push("UserDashboardScreen");
        })
        .catch((error) => console.error(error));
    }
  };

  const onResendOTPPressed = () => {
    alert("Resend OTP pressed.");
  };

  const onBackButtonPressed = () => {
    navigation.push("AccountCreateScreen");
  };

  const navigateToSignIn = () => {
    navigation.push("LoginScreen");
  };

  return (
    <View style={styles.container}>
      <Logo bottom={40}></Logo>
      <PalsText label="Verify" type="h1"></PalsText>
      <PalsTextInput
        label="Otp"
        value={otp.value}
        onChangeText={(text) =>
          setOtp({
            value: text,
            error: "",
          })
        }
        errorText={otp.error}
        description={otp.description}
      ></PalsTextInput>

      <View style={styles.resendOtp}>
        <PalsUrl label="Resend OTP" action={onResendOTPPressed}></PalsUrl>
      </View>

      <View style={styles.verifyBtn}>
        <TouchableButton
          label="Verify"
          theme="dark"
          action={verifyAccount}
        ></TouchableButton>
      </View>

      <TouchableButton
        label="Back"
        theme="outlined"
        action={onBackButtonPressed}
      ></TouchableButton>

      <View style={styles.signInLine}>
        <Text>
          Already have an account?{" "}
          <Text style={styles.signIn} onPress={navigateToSignIn}>
            Sign in
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
  verifyBtn: { marginTop: 20 },
  resendOtp: { marginTop: 8 },
  signInLine: {
    alignSelf: "center",
    marginTop: 20,
    marginBottom: 30,
  },
  signIn: {
    fontWeight: "bold",
  },
});
