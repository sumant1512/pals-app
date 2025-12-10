import React from "react";
import { View, StyleSheet } from "react-native";

const HeaderOverlay = () => {
  return <View style={styles.overlay} />;
};

export default HeaderOverlay;

const styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: 35,
    backgroundColor: "rgba(255, 255, 255, 0.5)", // translucent white
    zIndex: 5,
    opacity: 0.4,
  },
});
