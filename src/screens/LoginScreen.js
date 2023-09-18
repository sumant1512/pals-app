import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";

import PalsText from "../components/PalsText";
import PalsTextInput from "../components/PalsTextInput";
import TouchableButton from "../components/PalsTouchableButton";
import Logo from "../components/Logo";

export default function LoginScreen({ navigation }) {
  const [phone, setPhone] = useState({
    value: "",
    error: "",
  });

  const onContinuePressed = () => {
    fetch("http://localhost:8080/auth/login", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        phone: phone.value,
      }),
    })
      .then((response) => response.json())
      .then((responseData) => {
        navigation.push("LoginVerifyScreen");
      })
      .catch((error) => console.error(error));
  };

  const navigateToSignUp = () => {
    navigation.push("AccountCreateScreen");
  };

  return (
    <View style={styles.container}>
      <Logo bottom={40}></Logo>
      <PalsText label="Log in" type="h1"></PalsText>

      <PalsTextInput
        label="Mobile number"
        value={phone.value}
        onChangeText={(text) =>
          setPhone({
            value: text,
            error: "",
          })
        }
        errorText={phone.error}
      ></PalsTextInput>

      <View style={styles.continueBtn}>
        <TouchableButton
          label="Continue"
          theme="filled"
          action={onContinuePressed}
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
});
