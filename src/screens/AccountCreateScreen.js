import { StyleSheet, View, Text } from "react-native";
import { useForm } from "react-hook-form";

import PalsText from "../components/PalsText";
import PalsTextInput from "../components/PalsTextInput";
import TouchableButton from "../components/PalsTouchableButton";
import Logo from "../components/Logo";

export default function AccountCreateScreen({ navigation }) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      fullName: "",
      phone: "",
    },
  });

  const onContinuePressed = (data) => {
    console.log(data);
    navigation.push("AccountVerifyScreen");
  };

  const navigateToSignIn = () => {
    navigation.push("LoginScreen");
  };

  return (
    <View style={styles.container}>
      <Logo bottom={40}></Logo>
      <PalsText label="Create Account" type="h1"></PalsText>
      <PalsTextInput
        name="fullName"
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
