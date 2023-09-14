import React from "react";
import { View, StyleSheet, Text, TextInput } from "react-native";

export default function PalsTextInput({ errorText, description, ...props }) {
  return (
    <View>
      <Text style={styles.label}>{props.label}</Text>
      <TextInput style={styles.input} {...props} />
      {description && !errorText ? (
        <Text style={styles.description}>{description}</Text>
      ) : null}
      {errorText ? <Text style={styles.error}>{errorText}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  label: {
    fontSize: 22,
    fontWeight: "400",
  },
  input: {
    height: 56,
    backgroundColor: "#EDEDED",
    alignItems: "center",
    padding: 12,
    marginTop: 8,
    borderRadius: 10,
  },
  description: {
    fontSize: 13,
    color: "#00008B",
    paddingTop: 8,
  },
  error: {
    fontSize: 13,
    color: "#FF0000",
    paddingTop: 0,
  },
});
