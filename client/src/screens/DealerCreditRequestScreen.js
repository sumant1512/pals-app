import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { serverDomain } from "../constants/Config";

const DealerCreditRequestScreen = () => {
  const creditRequests = [
    {
      id: 1,
      name: "John Doe",
      shop: "Doe Hardware",
      address: "123 Elm St\nNew York",
      amount: 5000,
    },
    {
      id: 2,
      name: "Jane Smith",
      shop: "Smith Electronics",
      address: "456 Oak St\nLos Angeles",
      amount: 8000,
    },
    {
      id: 3,
      name: "Michael Johnson",
      shop: "Johnson Supplies",
      address: "789 Pine St\nChicago",
      amount: 12000,
    },
  ];

  const handleApprove = (id) => {
    console.log("Approved:", id);
  };

  const handleReject = (id) => {
    console.log("Rejected:", id);
  };

  useFocusEffect(
    React.useCallback(() => {
      getCoupons();
    }, [])
  );

  const getCoupons = () => {
    (() => {
      AsyncStorage.getItem("authToken").then((authToken) => {
        if (authToken) {
          const headers = {
            Accept: "application/json",
            "Content-Type": "application/json",
            authorization: `Bearer ${authToken}`,
          };
          axios
            .get(`${serverDomain}/api/coupon/get-redeem-request`, { headers })
            .then((couponResponse) => {
              console.log("Coupons Response:", couponResponse);
              // setQrList(couponResponse?.data?.coupons);
              // setLoading(false);
            })
            .catch((error) => {
              console.error("API Error:", error);
              // setErrorMsg(
              //   error?.response?.data?.message
              //     ? error?.response?.data?.message
              //     : error?.response?.statusText
              // );
              // setErrorVisible(true);
              // setLoading(false);
            });
        } else {
          // setOpenedScreen();
          // clearAuthStorage();
          // clearUserInfoStorage();
          // setLoading(false);
          // navigation.navigate("Login");
        }
      });
    })();
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>Credit Requests</Text>

      {creditRequests.map((dealer) => (
        <View key={dealer.id} style={styles.card}>
          <View style={styles.row}>
            <View style={styles.infoSection}>
              <Text style={styles.name}>{dealer.name}</Text>
              <Text style={styles.subInfo}>{dealer.shop}</Text>
              <Text style={styles.subInfo}>{dealer.address}</Text>
            </View>
            <Text style={styles.amount}>${dealer.amount.toLocaleString()}</Text>
          </View>

          <View style={styles.buttonRow}>
            <TouchableOpacity
              style={[styles.button, styles.approveBtn]}
              onPress={() => handleApprove(dealer.id)}
            >
              <Text style={styles.buttonText}>Approve</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button, styles.rejectBtn]}
              onPress={() => handleReject(dealer.id)}
            >
              <Text style={[styles.buttonText, { color: "#000" }]}>Reject</Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingBottom: 32,
    backgroundColor: "#fff",
  },
  heading: {
    fontSize: 22,
    fontWeight: "600",
    marginBottom: 12,
    textAlign: "center",
  },
  card: {
    borderWidth: 1,
    borderColor: "#eee",
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  infoSection: {
    flex: 1,
    marginRight: 10,
  },
  name: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 2,
  },
  subInfo: {
    fontSize: 14,
    color: "#555",
  },
  amount: {
    fontSize: 16,
    fontWeight: "600",
    alignSelf: "flex-start",
  },
  buttonRow: {
    flexDirection: "row",
    marginTop: 12,
    justifyContent: "space-between",
  },
  button: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 6,
    alignItems: "center",
    marginHorizontal: 4,
  },
  approveBtn: {
    backgroundColor: "#007bff",
  },
  rejectBtn: {
    backgroundColor: "#f2f2f2",
  },
  buttonText: {
    fontWeight: "600",
    color: "#fff",
  },
});

export default DealerCreditRequestScreen;
