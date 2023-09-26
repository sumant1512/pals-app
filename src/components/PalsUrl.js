import React from "react";
import { StyleSheet, Text } from "react-native";

export default function PalsUrl({ label, action }) {
  return (
    <Text style={styles.text} onPress={action}>
      {label}
    </Text>
  );
}

const styles = StyleSheet.create({
  text: {
    textAlign: "right",
  },
});
