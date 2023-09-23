import { StyleSheet, View } from "react-native";
import { useForm } from "react-hook-form";

import PalsText from "../components/PalsText";
import PalsTextInput from "../components/PalsTextInput";
import TouchableButton from "../components/PalsTouchableButton";
import Logo from "../components/Logo";

export default function PinForgetScreen({ navigation }) {
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
    console.log(data);
    navigation.push("PinForgetVerifyScreen");
  };

  const onCancelButtonPressed = () => {
    navigation.push("LoginScreen");
  };

  return (
    <View style={styles.container}>
      <Logo bottom={40}></Logo>
      <PalsText label="Send Otp" type="h1"></PalsText>

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
});
