import React, { useState } from "react";

import { StyleSheet } from "react-native";
import TouchableButton from "../components/PalsTouchableButton";
import { View } from "react-native";

export default function StartScreen() {
  const [name, setName] = useState({ value: "", error: "" });

  const [text, onChangeText] = React.useState("Useless Text");

  const getStarted = () => {
    alert("Navihate to home");
  };

  return (
    <View style={styles.container}>
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
    paddingHorizontal: 20,
    justifyContent: "center",
  },
});
