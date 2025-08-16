import React from "react";
import { View, Text, StyleSheet } from "react-native";

const getStatusColor = (status) => {
  switch (status) {
    case "approved":
      return "#4CAF50";
    case "pending":
      return "#FF9800";
    case "rejected":
      return "#F44336";
    case "scanned":
      return "#4CAF50";
    default:
      return "#9E9E9E";
  }
};

const TransactionCard = ({ transaction }) => {
  return (
    <View style={styles.card}>
      <View style={styles.row}>
        <Text
          style={[styles.status, { color: getStatusColor(transaction.status) }]}
        >
          {transaction.status}
        </Text>
        <Text style={styles.amount}>₹ {transaction.amount}</Text>
      </View>

      <Text style={styles.text}>
        Source: <Text style={styles.highlight}>{transaction.source}</Text>
      </Text>
      <Text style={styles.text}>
        Ref. No.: <Text style={styles.highlight}>{transaction.reference}</Text>
      </Text>
      <Text style={styles.date}>{transaction.createdAt}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 15,
    marginVertical: 8,
    marginHorizontal: 15,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  status: {
    fontSize: 14,
    fontWeight: "500",
    color: "#001333",
  },
  amount: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#001333",
  },
  text: {
    fontSize: 14,
    color: "#555",
    marginTop: 2,
  },
  highlight: {
    color: "#1A73E8",
    fontWeight: "500",
  },
  date: {
    fontSize: 12,
    color: "#777",
    marginTop: 5,
  },
});

export default TransactionCard;
