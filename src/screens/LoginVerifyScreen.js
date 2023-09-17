import { useState } from "react";
import { StyleSheet, View } from "react-native";

import TouchableButton from "../components/PalsTouchableButton";
import PalsTextInput from "../components/PalsTextInput";
import Logo from "../components/Logo";
import PalsText from "../components/PalsText";
import PalsUrl from "../components/PalsUrl";

export default function LoginVerifyScreen({ navigation }) {
  const [otp, setOtp] = useState({
    value: "",
    error: "",
  });

  const loginAccount = () => {
    navigation.push("UserDashboardScreen");
  };

  const onResendOTPPressed = () => {
    alert("Resend OTP pressed.");
  };

  const onBackButtonPressed = () => {
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

      <View style={styles.continueBtn}>
        <TouchableButton
          label="Login"
          theme="dark"
          action={loginAccount}
        ></TouchableButton>
      </View>

      <TouchableButton
        label="Back"
        theme="outlined"
        action={onBackButtonPressed}
      ></TouchableButton>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: "center",
  },
  continueBtn: { marginTop: 20 },
  resendOtp: { marginTop: 8 },
});
