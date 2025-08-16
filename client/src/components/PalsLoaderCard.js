import React from "react";
import { View, Text, ActivityIndicator, StyleSheet } from "react-native";

const PalsLoaderCard = () => {
  return (
    <View style={styles.wrapper}>
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#2e86de" />
        <Text style={{ marginTop: 10 }}>Loading...</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loaderContainer: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
    width: 200,
    height: 150,

    // iOS shadow
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,

    // Android shadow
    elevation: 5,
  },
});

export default PalsLoaderCard;
