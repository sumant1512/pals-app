import { StyleSheet, View } from "react-native";
import { useForm } from "react-hook-form";

import PalsText from "../components/PalsText";
import PalsTextInput from "../components/PalsTextInput";
import TouchableButton from "../components/PalsTouchableButton";
import Logo from "../components/Logo";

export default function PinSetScreen({ navigation }) {
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

  const onSavePressed = (data) => {
    console.log(data);
    navigation.push("LoginScreen");
  };

  const onCancelButtonPressed = () => {
    navigation.push("LoginScreen");
  };

  return (
    <View style={styles.container}>
      <Logo bottom={40}></Logo>
      <PalsText label="Set Password" type="h1"></PalsText>

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
