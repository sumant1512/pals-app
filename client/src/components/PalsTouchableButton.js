import React from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";

const PalsTouchableButton = ({ label, onPress, style, theme = "filled" }) => {
  const buttonStyles =
    theme === "filled"
      ? [styles.button, style]
      : [styles.button, styles.outline, style];

  const textStyles =
    theme === "filled"
      ? styles.buttonText
      : [styles.buttonText, styles.outlineText];

  return (
    <TouchableOpacity style={buttonStyles} onPress={onPress}>
      <Text style={textStyles}>{label}</Text>
    </TouchableOpacity>
  );
};

export default PalsTouchableButton;

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#014589", // filled theme color
    borderRadius: 25,
    paddingVertical: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  outline: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "#014589",
  },
  outlineText: {
    color: "#014589",
  },
});
