import React, { useState } from "react";
import { StyleSheet, View, FlatList, Text } from "react-native";
import {
  useNavigation,
  useFocusEffect,
  useRoute,
} from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

import { BE_PATH } from "../constants/Config";
import PalsText from "../components/PalsText";
import UserHeader from "../components/UserHeader";
import BackButton from "../components/BackButton";

export default function UserTransactionsScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const { userId } = route?.params || {};

  useFocusEffect(
    React.useCallback(() => {
      if (userId) {
        getUserTransactionsByAdmin();
      } else {
        getUserTransactions();
      }
    }, [])
  );

  const profilePressed = () => {
    navigation.getParent()?.navigate("DealerProfile");
  };

  const getUserTransactions = async () => {
    setLoading(true);
    const authToken = await AsyncStorage.getItem("authToken");

    if (!authToken) {
      navigation.navigate("Login");
      return;
    }

    const headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
      authorization: `Bearer ${authToken}`,
    };

    try {
      const res = await axios.get(`${BE_PATH}/api/coupon/transactions`, {
        headers,
      });
      setTransactions(res.data.transactions || []);
    } catch (error) {
      alert("Failed to fetch transactions.");
    } finally {
      setLoading(false);
    }
  };

  const getUserTransactionsByAdmin = async () => {
    setLoading(true);
    const authToken = await AsyncStorage.getItem("authToken");

    if (!authToken) {
      navigation.navigate("Login");
      return;
    }

    const headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
      authorization: `Bearer ${authToken}`,
    };

    try {
      const res = await axios.post(
        `${BE_PATH}/api/coupon/transactions-by-admin`,
        { userId: userId },
        {
          headers,
        }
      );
      setTransactions(res.data.transactions || []);
    } catch (error) {
      alert("Failed to fetch transactions.");
    } finally {
      setLoading(false);
    }
  };

  const renderTransaction = ({ item }) => {
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

    return (
      <View
        style={[
          styles.transactionItem,
          { borderLeftColor: getStatusColor(item.status) },
        ]}
      >
        <View style={styles.row}>
          <Text style={styles.transactionType}>
            {item.type === "credit" ? "Credited" : "Debited"}
          </Text>
          <Text
            style={[
              styles.transactionAmount,
              { color: getStatusColor(item.status) },
            ]}
          >
            ₹{item.amount}
          </Text>
        </View>
        <Text style={styles.transactionSource}>Source: {item.source}</Text>
        <Text style={styles.transactionRef}>Ref: {item.reference}</Text>
        {item?.approvedBy?.name && (
          <Text style={styles.approvedBy}>
            Approved By: {item.approvedBy.name}
          </Text>
        )}
        <Text style={styles.transactionDate}>
          {new Date(item.createdAt).toLocaleString()}
        </Text>

        <View
          style={[
            styles.statusChip,
            { backgroundColor: getStatusColor(item.status) },
          ]}
        >
          <Text style={styles.statusChipText}>{item.status.toUpperCase()}</Text>
        </View>
      </View>
    );
  };

  return (
    <>
      <UserHeader action={profilePressed} />
      <View style={styles.container}>
        <PalsText label={"Transactions"} type={"h5"} />

        <View style={styles.listContainer}>
          {loading ? (
            <Text style={styles.centerText}>Loading...</Text>
          ) : transactions.length === 0 ? (
            <Text style={styles.centerText}>No transactions found.</Text>
          ) : (
            <FlatList
              data={transactions}
              renderItem={renderTransaction}
              keyExtractor={(item) => item._id}
              showsVerticalScrollIndicator={true}
            />
          )}
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingBottom: 80,
  },
  listContainer: {
    flex: 1,
  },
  transactionItem: {
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderLeftWidth: 4,
    borderColor: "#eee",
    backgroundColor: "#fff",
    position: "relative",
    marginBottom: 10,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  transactionType: {
    fontWeight: "600",
    fontSize: 16,
    color: "#333",
  },
  transactionAmount: {
    fontSize: 18,
    fontWeight: "bold",
  },
  transactionSource: {
    fontSize: 14,
    color: "#555",
    marginTop: 4,
  },
  transactionRef: {
    fontSize: 13,
    color: "#777",
    marginTop: 2,
  },
  approvedBy: {
    fontSize: 13,
    color: "#777",
    marginTop: 2,
  },
  transactionDate: {
    fontSize: 12,
    color: "#aaa",
    marginTop: 4,
  },
  centerText: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
    color: "#666",
  },
  statusChip: {
    position: "absolute",
    bottom: 10,
    right: 10,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusChipText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
    textTransform: "uppercase",
  },
});
