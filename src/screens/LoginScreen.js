import { useState } from "react";
import { StyleSheet, TouchableOpacity, Text } from "react-native";

import { View } from "../components/Themed";
import PalsText from "../components/PalsText";
import PalsTextInput from "../components/PalsTextInput";
import TouchableButton from "../components/PalsTouchableButton";
import PalsUrl from "../components/PalsUrl";
import Logo from "../components/Logo";

export default function LoginScreen({ navigation }) {
  const [userName, setUserName] = useState({
    value: "",
    error: "",
    description: "",
  });

  const [password, setPassword] = useState({
    value: "",
    error: "",
    description: "",
  });

  const onLoginPressed = () => {
    navigation.push("UserDashboardScreen");
  };

  const navigateToForgetPassword = () => {
    navigation.push("PasswordForgetScreen");
  };

  const navigateToSignUp = () => {
    navigation.push("AccountCreateScreen");
  };

  return (
    <View style={styles.container}>
      <Logo bottom={40}></Logo>
      <PalsText label="Log in" type="h1"></PalsText>

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

      <PalsUrl
        label="Forgot password?"
        action={navigateToForgetPassword}
      ></PalsUrl>

      <TouchableButton
        label="Login"
        theme="filled"
        action={onLoginPressed}
      ></TouchableButton>

      <TouchableOpacity style={styles.signUp}>
        {/* <Text> Don't have an account?</Text> */}
        <Text onPress={navigateToSignUp}> Sign up</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 32,
    justifyContent: "center",
  },
  signUp: {
    textAlign: "center",
  },
});
