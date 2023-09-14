import { useState } from "react";
import { StyleSheet } from "react-native";

import { View } from "../components/Themed";
import PalsText from "../components/PalsText";
import PalsTextInput from "../components/PalsTextInput";
import TouchableButton from "../components/PalsTouchableButton";

export default function LoginScreen() {
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
    // const nameError = nameValidator(name.value);
    // if (nameError) {
    //   setName({ ...name, error: nameError });
    //   return;
    // }
    console.log(userName, password);
    alert("Login");
  };

  return (
    <View style={styles.container}>
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

      <PalsText label="Forgot password?" type="p1"></PalsText>

      <TouchableButton
        label="Login"
        theme="filled"
        action={onLoginPressed}
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
