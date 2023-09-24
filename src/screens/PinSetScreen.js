import { StyleSheet, View, Text } from "react-native";
import { useForm } from "react-hook-form";

import PalsText from "../components/PalsText";
import PalsTextInput from "../components/PalsTextInput";
import TouchableButton from "../components/PalsTouchableButton";
import Logo from "../components/Logo";

export default function PinSetScreen({ navigation }) {
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      pin: "",
      confirmPin: "",
    },
  });

  const firstPin = watch("pin");

  const onSavePressed = (data) => {
    console.log(data);
    navigation.push("LoginScreen");
  };

  const onCancelButtonPressed = () => {
    navigation.push("LoginScreen");
  };

  const navigateToSignIn = () => {
    navigation.push("LoginScreen");
  };

  return (
    <View style={styles.container}>
      <Logo bottom={40}></Logo>
      <PalsText label="New Pin" type="h1"></PalsText>

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

      <View style={styles.continueBtn}>
        <TouchableButton
          label="Save"
          theme="filled"
          action={handleSubmit(onSavePressed)}
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
