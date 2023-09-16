import React from "react";
import { StyleSheet, View } from "react-native";
import TouchableButton from "../components/PalsTouchableButton";
import { Image } from "react-native";
import Logo from "../components/Logo";

export default function StartScreen({ navigation }) {
  const getStarted = () => {
    navigation.push("HomeScreen");
  };

  return (
    <View style={styles.container}>
      <Logo></Logo>

      <TouchableButton
        label="Get started"
        theme="filled"
        action={getStarted}
      ></TouchableButton>

      {/* <PalsText label="20 credit added to your Wallet" type="p2"></PalsText>
      <PalsText label="Profile Settings" type="p3"></PalsText>
      <PalsText label="Pals' Credit" type="p4"></PalsText>
      <PalsText label="986" type="h2"></PalsText> */}
    </View>
  );
}

// Some styles given to button
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 32,
    justifyContent: "center",
  },
});
