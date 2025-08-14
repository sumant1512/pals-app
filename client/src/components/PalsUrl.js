import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function PalsUrl({ label, action }) {
  return (
    <View style={styles.container}>
      <Text style={styles.text} onPress={action}>
        {label}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    textDecorationLine: "underline",
    fontSize: 16,
  },
});
