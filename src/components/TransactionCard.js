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

function formatDate(date) {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const day = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear();

  let hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12; // convert 0 to 12

  return `${day}-${month}-${year} | ${hours}:${minutes} ${ampm}`;
}

const capitalizeFirst = (text) => {
  if (!text) return "";
  return text.charAt(0).toUpperCase() + text.slice(1);
};

const TransactionCard = ({ transaction }) => {
  return (
    <View style={styles.card}>
      <View style={styles.row}>
        <Text
          style={[styles.status, { color: getStatusColor(transaction.status) }]}
        >
          {capitalizeFirst(transaction.status)}
        </Text>
        <Text style={styles.amount}>₹ {transaction.points}</Text>
      </View>

      <Text style={styles.text}>
        Source:{" "}
        <Text style={styles.highlight}>
          {capitalizeFirst(transaction.event_type)}
        </Text>
      </Text>
      <Text style={styles.text}>
        Ref. No.: <Text style={styles.highlight}>{transaction.id}</Text>
      </Text>
      {transaction.balance_before != null && (
        <Text style={styles.text}>
          Balance Before:{" "}
          <Text style={styles.highlight}>{transaction.balance_before}</Text>
        </Text>
      )}
      {transaction.balance_after != null && (
        <Text style={styles.text}>
          Balance After:{" "}
          <Text style={styles.highlight}>{transaction.balance_after}</Text>
        </Text>
      )}
      <Text style={styles.date}>
        {formatDate(new Date(transaction.created_at))}
      </Text>
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
