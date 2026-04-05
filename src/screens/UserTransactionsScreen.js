import React, { useState } from "react";
import {
  StyleSheet,
  View,
  FlatList,
  Text,
  ImageBackground,
} from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

import { BE_PATH } from "../constants/Config";
import TransactionCard from "../components/TransactionCard";
import HeaderOverlay from "../components/HeaderOverlay";
import UserHeader from "../components/UserHeader";
import NoTransactionCard from "../components/NoTransactionCard";
import PalsLoaderCard from "../components/PalsLoaderCard";

export default function UserTransactionsScreen() {
  const navigation = useNavigation();
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useFocusEffect(
    React.useCallback(() => {
      getUserTransactions();
    }, [])
  );

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
      const res = await axios.get(`${BE_PATH}/api/mobile/v1/transactions`, {
        headers,
      });
      setTransactions(res.data.data.transactions || []);
    } catch (error) {
      alert("Failed to fetch transactions.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <HeaderOverlay />

      {/* Top Background */}
      <ImageBackground
        source={require("../assets/profile_bg.png")}
        style={styles.topBackground}
      >
        <UserHeader />
        <Text style={styles.title}>Transactions</Text>
      </ImageBackground>

      {/* Transactions Section */}
      <View style={styles.transactionsWrapper}>
        {loading ? (
          <PalsLoaderCard />
        ) : transactions.length === 0 ? (
          <NoTransactionCard />
        ) : (
          <FlatList
            data={transactions}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <TransactionCard transaction={item} />}
            contentContainerStyle={{ paddingBottom: 20 }}
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 80,
  },
  topBackground: {
    height: 250,
    width: "100%",
    backgroundColor: "#001333",
  },
  title: {
    fontSize: 24,
    color: "#fff",
    fontWeight: "bold",
    paddingHorizontal: 20,
    marginTop: 10,
  },
  transactionsWrapper: {
    flex: 1,
    marginTop: -40,
    zIndex: 10,
    position: "relative",
    paddingHorizontal: 10,
  },
  centerText: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
    color: "#555",
  },
});
