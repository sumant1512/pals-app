import React from "react";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity, Image, StyleSheet } from "react-native";

export default function BackButton() {
  const navigation = useNavigation();
  return (
    <TouchableOpacity onPress={() => navigation.goBack()}>
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
