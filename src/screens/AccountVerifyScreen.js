import { StyleSheet, View, Text } from "react-native";
import { useForm } from "react-hook-form";
import { useNavigation, useRoute } from "@react-navigation/native";

import TouchableButton from "../components/PalsTouchableButton";
import PalsTextInput from "../components/PalsTextInput";
import Logo from "../components/Logo";
import PalsText from "../components/PalsText";
import PalsUrl from "../components/PalsUrl";

export default function AccountVerifyScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      otp: "",
    },
  });

  const verifyAccount = (data) => {
    fetch("http://localhost:8080/auth/verify", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        phone: route?.params?.phone,
        otp: data.otp,
      }),
    })
      .then((response) => response.json())
      .then((responseData) => {
        if (responseData.status) {
          navigation.navigate("LoginScreen");
        }
      })
      .catch((error) => console.error(error));
  };

  const onResendOTPPressed = () => {
    alert("Resend OTP pressed.");
    fetch("http://localhost:8080/auth/resendOtp", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: route?.params?.userId,
        otp: data.otp,
      }),
    })
      .then((response) => response.json())
      .then((responseData) => {
        if (responseData.status) {
          navigation.navigate("LoginScreen");
        }
      })
      .catch((error) => console.error(error));
  };

  const onBackButtonPressed = () => {
    const id = 1;
    fetch(`http://localhost:8080/auth/resetAuthInfo/${id}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((responseData) => {
        console.log(JSON.stringify(responseData));
        navigation.push("AccountCreateScreen");
      })
      .catch((error) => console.error(error));
  };

  const navigateToSignIn = () => {
    navigation.push("LoginScreen");
  };

  return (
    <View style={styles.container}>
      <Logo bottom={40}></Logo>
      <PalsText label="Verify" type="h1"></PalsText>
      <PalsTextInput
        name="otp"
        placeholder="OTP"
        control={control}
        rules={{ required: "OTP is required." }}
      />

      <View style={styles.resendOtp}>
        <PalsUrl label="Resend OTP" action={onResendOTPPressed}></PalsUrl>
      </View>

      <View style={styles.verifyBtn}>
        <TouchableButton
          label="Verify"
          theme="dark"
          action={handleSubmit(verifyAccount)}
        ></TouchableButton>
      </View>

      <TouchableButton
        label="Back"
        theme="outlined"
        action={onBackButtonPressed}
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
  verifyBtn: { marginTop: 20 },
  resendOtp: { marginTop: 8 },
  signInLine: {
    alignSelf: "center",
    marginTop: 20,
    marginBottom: 30,
  },
  signIn: {
    fontWeight: "bold",
  },
});
