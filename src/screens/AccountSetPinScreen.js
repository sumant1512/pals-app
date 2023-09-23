import { StyleSheet, View } from "react-native";
import { useForm } from "react-hook-form";

import TouchableButton from "../components/PalsTouchableButton";
import PalsTextInput from "../components/PalsTextInput";
import Logo from "../components/Logo";
import PalsText from "../components/PalsText";
import PalsUrl from "../components/PalsUrl";

export default function AccountSetPinScreen({ navigation }) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      pin: "",
      confirmPin: "",
    },
  });

  const setPinPressed = (data) => {
    console.log(data);
    navigation.push("LoginScreen");
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
        rules={{ required: "Pin is required." }}
      />

      <PalsTextInput
        name="confirmPin"
        placeholder="Confirm Pin"
        control={control}
        rules={{ required: "Confirm pin is required." }}
      />

      <View style={styles.continueBtn}>
        <TouchableButton
          label="Set"
          theme="dark"
          action={setPinPressed}
        ></TouchableButton>
      </View>

      <TouchableButton
        label="Cancel"
        theme="outlined"
        action={handleSubmit(onCancelPressed)}
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
