import React from "react";
import { TouchableOpacity, Image, StyleSheet } from "react-native";

export default function Logo({ bottom }) {
  return (
    <TouchableOpacity>
      <Image
        source={require("./../assets/pals_paint.png")}
        style={[styles.image, marginBottom(bottom ? bottom : 150)]}
      />
    </TouchableOpacity>
  );
}

function marginBottom(bottom) {
  return {
    marginBottom: bottom,
  };
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 10,
    left: 4,
  },
  image: {
    height: 118,
    width: "100%",
    marginBottom: 150,
    alignSelf: "center",
    maxWidth: 326,
  },
});
