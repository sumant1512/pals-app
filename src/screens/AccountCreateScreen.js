import { StyleSheet, View, Text } from "react-native";
import { useForm } from "react-hook-form";
import { useNavigation } from "@react-navigation/native";

import PalsText from "../components/PalsText";
import PalsTextInput from "../components/PalsTextInput";
import TouchableButton from "../components/PalsTouchableButton";
import Logo from "../components/Logo";

export default function AccountCreateScreen() {
  const navigation = useNavigation();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "Hemant Mishra",
      phone: "9131410942",
    },
  });

  const onContinuePressed = async (data) => {
    await fetch("http://localhost:8080/auth/register", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...data, userType: "painter" }),
    })
      .then((response) => response.json())
      .then((responseData) => {
        if (responseData.status) {
          navigation.navigate("AccountVerifyScreen", {
            phone: responseData?.phone,
          });
        }
      })
      .catch((error) => console.error(error));
  };

  const navigateToSignIn = () => {
    navigation.push("LoginScreen");
  };

  return (
    <View style={styles.container}>
      <Logo bottom={40}></Logo>
      <PalsText label="Create Account" type="h1"></PalsText>
      <PalsTextInput
        name="name"
        placeholder="Full name"
        control={control}
        rules={{ required: "Full name is required." }}
      />

      <PalsTextInput
        name="phone"
        placeholder="Mobile"
        control={control}
        rules={{ required: "Mobile is required." }}
      />

      <View style={styles.continueBtn}>
        <TouchableButton
          label="Continue"
          theme="filled"
          action={handleSubmit(onContinuePressed)}
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
