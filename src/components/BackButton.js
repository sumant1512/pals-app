import React from "react";
import { TouchableOpacity, Image, StyleSheet } from "react-native";

export default function BackButton({ action }) {
  return (
    <TouchableOpacity onPress={action}>
      <Image source={require("./../assets/back.jpeg")} style={styles.image} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 10,
    left: 4,
  },
  image: {
    width: 24,
    height: 24,
  },
});
