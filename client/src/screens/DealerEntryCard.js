import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  LayoutAnimation,
  Platform,
  UIManager,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import TouchableButton from "../components/PalsTouchableButton";

// Enable LayoutAnimation on Android
if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const DealerEntryCard = ({
  name,
  shop,
  address,
  availableCredit,
  totalCredit,
  totalDebit,
  onPress,
}) => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpand = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpanded(!expanded);
  };

  return (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.9}
      onPress={toggleExpand}
    >
      <View style={styles.header}>
        <View>
          <Text style={styles.name}>{name}</Text>
          {shop && <Text style={styles.sub}>{shop}</Text>}
          {address && <Text style={styles.sub}>{address}</Text>}
        </View>
        <Ionicons
          name={expanded ? "chevron-up" : "chevron-down"}
          size={24}
          color="#176B87"
        />
      </View>

      <View style={styles.divider} />

      <View style={styles.creditRow}>
        <Text style={styles.label}>Available Credit</Text>
        <Text style={styles.credit}>₹ {availableCredit?.toLocaleString()}</Text>
      </View>

      {expanded && (
        <>
          <View style={styles.creditRow}>
            <Text style={styles.label}>Total Credit</Text>
            <Text style={styles.value}>₹ {totalCredit?.toLocaleString()}</Text>
          </View>
          <View style={styles.creditRow}>
            <Text style={styles.label}>Total Debit</Text>
            <Text style={styles.value}>₹ {totalDebit?.toLocaleString()}</Text>
          </View>

          <TouchableButton
            label="View Transactions"
            theme="filled"
            onPress={onPress}
          ></TouchableButton>
        </>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    marginVertical: 10,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 3,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
  },
  sub: {
    fontSize: 14,
    color: "#666",
    marginTop: 2,
  },
  divider: {
    height: 1,
    backgroundColor: "#e0e0e0",
    marginVertical: 12,
  },
  creditRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  label: {
    fontSize: 14,
    color: "#444",
  },
  credit: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#176B87",
  },
  value: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000",
  },
  button: {
    backgroundColor: "#176B87",
    paddingVertical: 10,
    borderRadius: 8,
    marginTop: 12,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 14,
  },
});

export default DealerEntryCard;
