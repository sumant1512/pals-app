import React from "react";
import { TouchableOpacity, StyleSheet, Text } from "react-native";

export default function TouchableButton({ label, theme, action }) {
  return (
    <TouchableOpacity
      style={[styles.button, fontButtonStyle(theme)]}
      onPress={action}
    >
      <Text style={[styles.text, fontButtonStyle(theme)]}>{label}</Text>
    </TouchableOpacity>
  );
}

function fontButtonStyle(type) {
  switch (type) {
    case "filled":
      return {
        backgroundColor: "#000000",
        color: "#ffffff",
      };
    case "outlined":
      return {
        backgroundColor: "#ffffff",
        color: "#000000",
        borderColor: "#dadada",
        borderWidth: 1,
      };
    case "light":
      return {
        backgroundColor: "#EDEDED",
        color: "#000000",
        borderColor: "#dadada",
        borderWidth: 1,
      };
    default:
      return {
        backgroundColor: "#000000",
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
  filled: {
    backgroundColor: "#000000",
    color: "#ffffff",
  },
  outlined: {
    backgroundColor: "#ffffff",
    color: "#000000",
    borderWidth: 1,
  },
  light: {
    backgroundColor: "#EDEDED",
    color: "#000000",
  },
});
