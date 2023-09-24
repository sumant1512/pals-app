import { StyleSheet, View } from "react-native";
import { useForm } from "react-hook-form";
import { useRoute } from "@react-navigation/native";

import TouchableButton from "../components/PalsTouchableButton";
import PalsTextInput from "../components/PalsTextInput";
import Logo from "../components/Logo";
import PalsText from "../components/PalsText";
import PalsUrl from "../components/PalsUrl";

export default function LoginPinScreen({ navigation }) {
  const route = useRoute();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      pin: "",
    },
  });

  const loginAccount = (data) => {
    // fetch("http://localhost:8080/auth/verify", {
    //   method: "POST",
    //   headers: {
    //     Accept: "application/json",
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({
    //     phone: "9579310997",
    //     otp: otp.value,
    //   }),
    // })
    //   .then((response) => response.json())
    //   .then((responseData) => {
    //     const token = responseData.data;
    //     if (token) {
    //       navigation.push("UserDashboardScreen");
    //     }
    //   })
    //   .catch((error) => console.error(error));
    console.log(data, route?.params?.phone);
    navigation.push("UserDashboardScreen");
  };

  const onForgotPinPressed = () => {
    alert("Resend OTP pressed.");
    navigation.push("PinForgetScreen");
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
        navigation.push("LoginScreen");
      })
      .catch((error) => console.error(error));
  };

  return (
    <View style={styles.container}>
      <Logo bottom={40}></Logo>
      <PalsText label="Verify" type="h1"></PalsText>
      <PalsTextInput
        name="pin"
        placeholder="Pin"
        control={control}
        rules={{
          required: "Pin is required.",
          minLength: { value: 4, message: "Min length should be 4." },
        }}
      />

      <View style={styles.forgotPin}>
        <PalsUrl label="Forgot Pin?" action={onForgotPinPressed}></PalsUrl>
      </View>

      <View style={styles.continueBtn}>
        <TouchableButton
          label="Login"
          theme="dark"
          action={handleSubmit(loginAccount)}
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
  forgotPin: { marginTop: 8 },
});
