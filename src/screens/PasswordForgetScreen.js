import { useState } from "react";
import { StyleSheet, View } from "react-native";

import PalsText from "../components/PalsText";
import PalsTextInput from "../components/PalsTextInput";
import TouchableButton from "../components/PalsTouchableButton";
import Logo from "../components/Logo";

export default function PasswordForgetScreen({ navigation }) {
  const [userName, setUserName] = useState({
    value: "",
    error: "",
  });
  const [otp, setOtp] = useState({
    value: "",
    error: "",
  });

  const onContinuePressed = () => {
    navigation.push("PasswordSetScreen");
  };

  const onBackButtonPressed = () => {
    navigation.push("LoginScreen");
  };

  return (
    <View style={styles.container}>
      <Logo bottom={40}></Logo>
      <PalsText label="Forget Password" type="h1"></PalsText>

      <PalsTextInput
        label="Username"
        value={userName.value}
        onChangeText={(text) =>
          setUserName({
            value: text,
            error: "",
          })
        }
        errorText={userName.error}
        description={userName.description}
      ></PalsTextInput>

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

      <View style={styles.continueBtn}>
        <TouchableButton
          label="Continue"
          theme="filled"
          action={onContinuePressed}
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
