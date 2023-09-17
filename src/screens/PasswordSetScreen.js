import { useState } from "react";
import { StyleSheet, View } from "react-native";

import PalsText from "../components/PalsText";
import PalsTextInput from "../components/PalsTextInput";
import TouchableButton from "../components/PalsTouchableButton";
import Logo from "../components/Logo";

export default function PasswordSetScreen({ navigation }) {
  const [password, setPassword] = useState({
    value: "",
    error: "",
    description: "",
  });
  const [confirmPassword, setConfirmPassword] = useState({
    value: "",
    error: "",
    description: "",
  });

  const onSavePressed = () => {
    navigation.push("LoginScreen");
  };

  const onCancelButtonPressed = () => {
    navigation.push("LoginScreen");
  };

  return (
    <View style={styles.container}>
      <Logo bottom={40}></Logo>
      <PalsText label="Set Password" type="h1"></PalsText>

      <PalsTextInput
        label="Password"
        value={password.value}
        onChangeText={(text) =>
          setPassword({
            value: text,
            error: "",
          })
        }
        errorText={password.error}
        description={password.description}
      ></PalsTextInput>

      <PalsTextInput
        label="Confirm Password"
        value={confirmPassword.value}
        onChangeText={(text) =>
          setconfirmPassword({
            value: text,
            error: "",
          })
        }
        errorText={confirmPassword.error}
        description={confirmPassword.description}
      ></PalsTextInput>

      <View style={styles.continueBtn}>
        <TouchableButton
          label="Save"
          theme="filled"
          action={onSavePressed}
        ></TouchableButton>
      </View>
      <TouchableButton
        label="Cancel"
        theme="outlined"
        action={onCancelButtonPressed}
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
});
