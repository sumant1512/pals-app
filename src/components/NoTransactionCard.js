import React from "react";
import { View, Text, StyleSheet } from "react-native";

const NoTransactionCard = () => {
  return (
    <View style={styles.card}>
      <Text style={styles.header}>Start your Pals Paint journey</Text>
      <Text style={styles.text}>
        <Text style={styles.highlight}>
          Scan your first coupon and earn instantly!
        </Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
    marginVertical: 10,
    marginHorizontal: 15,
    alignItems: "center", // center horizontally
    justifyContent: "center", // center vertically
    elevation: 3,
  },
  header: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#001333",
    textAlign: "center",
    marginBottom: 16,
  },
  text: {
    fontSize: 14,
    color: "#555",
    textAlign: "center",
  },
  highlight: {
    color: "#1A73E8",
    fontWeight: "500",
  },
});

export default NoTransactionCard;
