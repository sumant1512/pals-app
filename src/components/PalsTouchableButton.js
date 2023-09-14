import React from "react";
import { TouchableOpacity, StyleSheet, Text } from "react-native";

export default function TouchableButton({ label, theme, action }) {
  return (
    <TouchableOpacity
      style={[styles.button, theme == "filled" ? styles.filled : styles.light]}
      onPress={action}
    >
      <Text
        style={[styles.text, theme == "filled" ? styles.filled : styles.light]}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    paddingVertical: 12,
    marginVertical: 8,
    borderRadius: 10,
  },
  text: {
    fontSize: 22,
    fontWeight: "400",
  },
  filled: {
    backgroundColor: "#000000",
    color: "#ffffff",
  },
  light: {
    backgroundColor: "#EDEDED",
    color: "#000000",
  },
});
