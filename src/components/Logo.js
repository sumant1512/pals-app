import React from "react";
import { View, Image, StyleSheet } from "react-native";

export default function Logo({ bottom }) {
  return (
    <View>
      <Image
        source={require("./../assets/pals_paint.png")}
        style={[styles.image, marginBottom(bottom ? bottom : 150)]}
      />
    </View>
  );
}

function marginBottom(bottom) {
  return {
    marginBottom: bottom,
  };
}

const styles = StyleSheet.create({
  image: {
    height: 118,
    width: "100%",
    marginBottom: 150,
    alignSelf: "center",
    maxWidth: 326,
  },
});
