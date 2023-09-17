import { useState } from "react";
import { StyleSheet, View } from "react-native";

import PalsText from "../components/PalsText";
import PalsTextInput from "../components/PalsTextInput";
import TouchableButton from "../components/PalsTouchableButton";
import Logo from "../components/Logo";
import PalsUrl from "../components/PalsUrl";

export default function PasswordForgetVerifyScreen({ navigation }) {
  const [otp, setOtp] = useState({
    value: "",
    error: "",
  });

  const onVerifyPressed = () => {
    navigation.push("PasswordSetScreen");
  };

  const onResendOTPPressed = () => {
    alert("Resend OTP pressed.");
  };

  const onBackButtonPressed = () => {
    navigation.push("PasswordForgetScreen");
  };

  return (
    <View style={styles.container}>
      <Logo bottom={40}></Logo>
      <PalsText label="Verify" type="h1"></PalsText>

      <PalsTextInput
        label="OTP"
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
          label="Verify"
          theme="filled"
          action={onVerifyPressed}
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
    paddingVertical: 40,
    justifyContent: "center",
  },
  continueBtn: { marginTop: 20 },
  resendOtp: { marginTop: 8 },
});
