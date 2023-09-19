import { useState } from "react";
import { StyleSheet, View, Text } from "react-native";

import PalsText from "../components/PalsText";
import PalsTextInput from "../components/PalsTextInput";
import TouchableButton from "../components/PalsTouchableButton";
import Logo from "../components/Logo";
import { nameValidators } from "../helpers/nameValidators";
import { phoneValidators } from "../helpers/phoneValidators";

export default function AccountCreateScreen({ navigation }) {
  const [name, setName] = useState({
    value: "",
    error: "",
    description: "",
  });
  const [phone, setPhone] = useState({
    value: "",
    error: "",
    description: "",
  });
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

  const onContinuePressed = () => {
    if (name.value && phone.value) {
      fetch("http://localhost:8080/auth/register", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name.value,
          phone: phone.value,
        }),
      })
        .then((response) => response.json())
        .then((responseData) => {
          navigation.push("AccountVerifyScreen");
        })
        .catch((error) => console.error(error));
    }
  };

  const onNameChanged = (value) => {
    setName({
      value: value,
      error: nameValidators(value),
    });
  };

  const onPhoneChanged = (value) => {
    setPhone({
      value: value,
      error: phoneValidators(value),
    });
  };

  const navigateToSignIn = () => {
    navigation.push("LoginScreen");
  };

  return (
    <View style={styles.container}>
      <Logo bottom={40}></Logo>
      <PalsText label="Create Account" type="h1"></PalsText>

      <PalsTextInput
        label="Full Name"
        value={name.value}
        onChangeText={(text) => onNameChanged(text)}
        errorText={name.error}
        description={name.description}
      ></PalsTextInput>

      <PalsTextInput
        label="Mobile"
        value={phone.value}
        onChangeText={(text) => onPhoneChanged(text)}
        errorText={phone.error}
        description={phone.description}
      ></PalsTextInput>

      <View style={styles.continueBtn}>
        <TouchableButton
          label="Continue"
          theme="filled"
          action={onContinuePressed}
        ></TouchableButton>
      </View>

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
  continueBtn: { marginTop: 20 },
  signInLine: {
    alignSelf: "center",
    marginTop: 20,
    marginBottom: 30,
  },
  signIn: {
    fontWeight: "bold",
  },
});
