import React from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";

const PalsTouchableButton = ({ label, onPress, style, theme = "filled" }) => {
  let buttonStyles = [styles.button];
  let textStyles = [styles.buttonText];

  if (theme === "outline") {
    buttonStyles.push(styles.outline);
    textStyles = [styles.buttonText, styles.outlineText];
  } else if (theme === "text") {
    buttonStyles = [styles.textButton]; // override all
    textStyles = [styles.textOnly];
  } else {
    buttonStyles = [styles.button];
    textStyles = [styles.buttonText];
  }

  if (style) {
    buttonStyles.push(style);
  }

  return (
    <TouchableOpacity style={buttonStyles} onPress={onPress}>
      <Text style={textStyles}>{label}</Text>
    </TouchableOpacity>
  );
};

export default PalsTouchableButton;

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#014589",
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
  textButton: {
    backgroundColor: "transparent",
    paddingVertical: 0,
    alignItems: "center",
    justifyContent: "center",
  },
  textOnly: {
    color: "#014589",
    fontSize: 14,
    fontWeight: "500",
  },
});
