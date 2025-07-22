import React from "react";
import { View, Text, StyleSheet, Image, Dimensions } from "react-native";

const getStatusStyle = (status) => {
  switch (status.toLowerCase()) {
    case "active":
      return { backgroundColor: "#28a745", color: "white" };
    case "inactive":
      return { backgroundColor: "#dee2e6", color: "#495057" };
    default:
      return { backgroundColor: "#e0e0e0", color: "#000" };
  }
};

const CouponCard = ({ amount, code, status, qr }) => {
  const statusStyle = getStatusStyle(status);

  return (
    <View style={styles.card}>
      <View style={styles.qrContainer}>
        <Image source={{ uri: `${qr}` }} style={styles.qrImage} />
      </View>

      <View style={styles.infoContainer}>
        <View style={styles.row}>
          <Text style={styles.label}>Amount</Text>
          <Text style={styles.value}>₹ {amount}</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>COE</Text>
          <Text style={styles.value}>{code}</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Status</Text>
          <View
            style={[
              styles.statusBadge,
              { backgroundColor: statusStyle.backgroundColor },
            ]}
          >
            <Text style={[styles.statusText, { color: statusStyle.color }]}>
              {status}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    marginVertical: 8,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    width: Dimensions.get("window").width - 40,
    shadowRadius: 6,
    elevation: 3,
  },
  qrContainer: {
    marginRight: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  infoContainer: {
    flex: 1,
    justifyContent: "space-between",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 6,
  },
  label: {
    fontWeight: "500",
    color: "#444",
  },
  value: {
    fontWeight: "600",
    fontSize: 16,
  },
  statusBadge: {
    borderRadius: 12,
    paddingTop: 2,
    paddingBottom: 4,
    paddingHorizontal: 10,
  },
  statusText: {
    fontWeight: "600",
    fontSize: 12,
    textTransform: "capitalize",
  },
  qrImage: {
    width: 100,
    height: 100,
    marginBottom: 8,
    borderRadius: 10,
    backgroundColor: "#eee",
  },
});

export default CouponCard;
