import React from "react";
import { TouchableOpacity, StyleSheet, Text } from "react-native";

export default function TouchableButton({ label, theme, action }) {
  return (
    <TouchableOpacity
      style={[styles.button, fontButtonStyle(theme)]}
      onPress={action}
    >
      <Text style={[styles.text, fontTextStyle(theme)]}>{label}</Text>
    </TouchableOpacity>
  );
}

function fontButtonStyle(type) {
  switch (type) {
    case "filled":
      return {
        backgroundColor: "#000000",
      };
    case "outlined":
      return {
        backgroundColor: "#ffffff",
        borderColor: "#dadada",
        borderWidth: 1,
      };
    case "light":
      return {
        backgroundColor: "#EDEDED",
        borderColor: "#dadada",
        borderWidth: 1,
      };
    default:
      return {
        backgroundColor: "#000000",
      };
  }
}

function fontTextStyle(type) {
  switch (type) {
    case "filled":
      return {
        color: "#ffffff",
      };
    case "outlined":
      return {
        color: "#000000",
      };
    case "light":
      return {
        color: "#000000",
      };
    default:
      return {
        color: "#ffffff",
      };
  }
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
});
