import React from "react";
// import { StyleSheet, Text } from "react-native";
import { View, Text, StyleSheet } from "react-native";

export default function PalsUrl({ label, action }) {
  return (
    // <Text style={styles.text} onPress={action}>
    //   {label}
    // </Text>
    <View style={styles.container}>
      <Text style={styles.text} onPress={action}>
        {label}
      </Text>
      <View style={styles.underline} />
    </View>
  );
}

// const styles = StyleSheet.create({
//   text: {
//     textAlign: "right",
//     textDecorationLine: "underline",
//   },
// });

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  underline: {
    borderBottomColor: "black",
    borderBottomWidth: 1,
    width: "100%",
  },
  text: {
    marginBottom: 1, // Adjust the space between text and underline
  },
});
