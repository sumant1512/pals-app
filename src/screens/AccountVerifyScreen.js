import { useState } from "react";
import { StyleSheet, View } from "react-native";

import TouchableButton from "../components/PalsTouchableButton";
import PalsTextInput from "../components/PalsTextInput";
import Logo from "../components/Logo";

export default function AccountVerifyScreen({ navigation }) {
  const [otp, setOtp] = useState({
    value: "",
    error: "",
  });

  const verifyAccount = () => {
    navigation.push("LoginScreen");
  };

  const onBackButtonPressed = () => {
    navigation.push("AccountCreateScreen");
  };

  return (
    <View style={styles.container}>
      <Logo bottom={40}></Logo>
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

      <View style={styles.continueBtn}>
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 32,
    justifyContent: "center",
  },
  continueBtn: { marginTop: 20 },
});
