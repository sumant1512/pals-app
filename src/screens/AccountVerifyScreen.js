import { useState } from "react";
import { StyleSheet, View } from "react-native";

import TouchableButton from "../components/PalsTouchableButton";
import PalsTextInput from "../components/PalsTextInput";

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

      <TouchableButton
        label="Verify"
        theme="dark"
        action={verifyAccount}
      ></TouchableButton>

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
});
