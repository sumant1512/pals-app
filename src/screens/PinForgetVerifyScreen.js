import { StyleSheet, View } from "react-native";
import { useForm } from "react-hook-form";

import PalsText from "../components/PalsText";
import PalsTextInput from "../components/PalsTextInput";
import TouchableButton from "../components/PalsTouchableButton";
import Logo from "../components/Logo";
import PalsUrl from "../components/PalsUrl";

export default function PinForgetVerifyScreen({ navigation }) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      otp: "",
    },
  });

  const onVerifyPressed = (data) => {
    console.log(data);
    navigation.push("PinSetScreen");
  };

  const onResendOTPPressed = () => {
    alert("Resend OTP pressed.");
  };

  const onBackButtonPressed = () => {
    navigation.push("PinForgetScreen");
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
});
