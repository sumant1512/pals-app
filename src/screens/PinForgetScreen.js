import { StyleSheet, View, Text } from "react-native";
import { useForm } from "react-hook-form";
import { useNavigation } from "@react-navigation/native";

import PalsText from "../components/PalsText";
import PalsTextInput from "../components/PalsTextInput";
import TouchableButton from "../components/PalsTouchableButton";
import Logo from "../components/Logo";
import { serverDomain } from "../constants/Config";

export default function PinForgetScreen() {
  const navigation = useNavigation();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      phone: "",
    },
  });

  const onSendOtpPressed = (data) => {
    fetch(`${serverDomain}/auth/forgetPassword`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        phone: data?.phone,
      }),
    })
      .then((response) => response.json())
      .then((responseData) => {
        if (responseData?.status) {
          navigation.navigate("PinResetScreen", {
            phone: data?.phone,
          });
        }
      })
      .catch((error) => console.error(error));
  };

  const onCancelButtonPressed = () => {
    navigation.goBack();
  };

  const navigateToSignIn = () => {
    navigation.navigate("LoginScreen");
  };

  return (
    <View style={styles.container}>
      <Logo bottom={40}></Logo>
      <PalsText label="Forgot password" type="h1"></PalsText>

      <PalsTextInput
        name="phone"
        placeholder="Mobile number"
        control={control}
        rules={{ required: "Mobile is required." }}
      />

      <View style={styles.continueBtn}>
        <TouchableButton
          label="Send Otp"
          theme="filled"
          action={handleSubmit(onSendOtpPressed)}
        ></TouchableButton>
      </View>
      <TouchableButton
        label="Cancel"
        theme="outlined"
        action={onCancelButtonPressed}
      ></TouchableButton>

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
