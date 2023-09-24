import { StyleSheet, View } from "react-native";
import { useForm } from "react-hook-form";
import { useNavigation, useRoute } from "@react-navigation/native";

import TouchableButton from "../components/PalsTouchableButton";
import PalsTextInput from "../components/PalsTextInput";
import Logo from "../components/Logo";
import PalsText from "../components/PalsText";

export default function AccountSetPinScreen() {
  const navigation = useNavigation();
  const route = useRoute();
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

  const setPinPressed = (data) => {
    fetch("http://localhost:8080/auth/setPin", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: route?.params?.userId,
        authToken: route?.params?.authToken,
        pin: data.pin,
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

  const onCancelPressed = () => {
    alert("Cancel pressed.");
  };

  return (
    <View style={styles.container}>
      <Logo bottom={40}></Logo>
      <PalsText label="Set Pin" type="h1"></PalsText>
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
          label="Set"
          theme="dark"
          action={handleSubmit(setPinPressed)}
        ></TouchableButton>
      </View>

      <TouchableButton
        label="Cancel"
        theme="outlined"
        action={onCancelPressed}
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
