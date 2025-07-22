import { StyleSheet, View, Text } from "react-native";
import { useForm } from "react-hook-form";
import { useNavigation, useRoute } from "@react-navigation/native";

import PalsText from "../components/PalsText";
import PalsTextInput from "../components/PalsTextInput";
import TouchableButton from "../components/PalsTouchableButton";
import Logo from "../components/Logo";
import PalsUrl from "../components/PalsUrl";
import { serverDomain } from "../constants/Config";

export default function PinResetScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      otp: "",
      pin: "",
      confirmPin: "",
    },
  });

  const firstPin = watch("pin");

  const onVerifyPressed = (data) => {
    console.log(data);

    fetch(`${serverDomain}/auth/resetPin`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        phone: route?.params?.phone,
        otp: data.otp,
        pin: data?.pin,
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
    fetch(`${serverDomain}/auth/resendOtp`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        phone: route?.params?.phone,
      }),
    })
      .then((response) => response.json())
      .then((responseData) => {})
      .catch((error) => console.error(error));
  };

  const onBackButtonPressed = () => {
    navigation.goBack();
  };

  const navigateToSignIn = () => {
    navigation.navigate("LoginScreen");
  };

  return (
    <View style={styles.container}>
      <Logo bottom={40}></Logo>
      <PalsText label="Reset Pin" type="h1"></PalsText>

      <PalsTextInput
        name="pin"
        placeholder="Pin"
        control={control}
        rules={{
          required: "Pin is required.",
          minLength: { value: 4, message: "Min length should be 4." },
        }}
      />

      <PalsTextInput
        name="confirmPin"
        placeholder="Confirm Pin"
        control={control}
        rules={{
          validate: (value) => value === firstPin || "Pin do not match.",
        }}
      />

      <PalsTextInput
        name="otp"
        placeholder="OTP"
        control={control}
        rules={{ required: "OTP is required." }}
      />

      <View style={styles.resendOtp}>
        <PalsUrl label="Resend OTP" action={onResendOTPPressed}></PalsUrl>
      </View>

      <View style={styles.continueBtn}>
        <TouchableButton
          label="Verify"
          theme="filled"
          action={handleSubmit(onVerifyPressed)}
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
  continueBtn: { marginTop: 20 },
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
