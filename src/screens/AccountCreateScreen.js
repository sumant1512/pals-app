import { useState } from "react";
import { StyleSheet, ScrollView } from "react-native";

import PalsText from "../components/PalsText";
import PalsTextInput from "../components/PalsTextInput";
import TouchableButton from "../components/PalsTouchableButton";
import { Text } from "react-native";
import Logo from "../components/Logo";
import { View } from "react-native";

export default function AccountCreateScreen({ navigation }) {
  const [name, setName] = useState({
    value: "",
    error: "",
    description: "",
  });
  const [email, setEmail] = useState({
    value: "",
    error: "",
    description: "",
  });
  const [mobile, setMobile] = useState({
    value: "",
    error: "",
    description: "",
  });
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
  const [confirmPassword, setConfirmPassword] = useState({
    value: "",
    error: "",
    description: "",
  });

  const onContinuePressed = () => {
    navigation.push("AccountVerifyScreen");
  };

  const navigateToSignIn = () => {
    navigation.push("LoginScreen");
  };

  return (
    <ScrollView style={styles.container}>
      <Logo bottom={20}></Logo>
      <PalsText label="Create Account" type="h1"></PalsText>

      <PalsTextInput
        label="Full Name"
        value={name.value}
        onChangeText={(text) =>
          setName({
            value: text,
            error: "",
          })
        }
        errorText={name.error}
        description={name.description}
      ></PalsTextInput>

      <PalsTextInput
        label="Email"
        value={email.value}
        onChangeText={(text) =>
          setEmail({
            value: text,
            error: "",
          })
        }
        errorText={email.error}
        description={email.description}
      ></PalsTextInput>

      <PalsTextInput
        label="Mobile"
        value={mobile.value}
        onChangeText={(text) =>
          setMobile({
            value: text,
            error: "",
          })
        }
        errorText={mobile.error}
        description={mobile.description}
      ></PalsTextInput>

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
          label="Continue"
          theme="filled"
          action={onContinuePressed}
        ></TouchableButton>
      </View>

      <View style={styles.signUpLine}>
        <Text>
          Already have an account?{" "}
          <Text style={styles.signUp} onPress={navigateToSignIn}>
            Sign in
          </Text>
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
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
