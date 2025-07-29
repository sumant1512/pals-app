import React, { useState } from "react";
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

import ErrorModal from "../components/PalsErrorModal";
import LoaderCard from "../components/PalsLoaderCard";
import UserHeader from "../components/UserHeader";
import { serverDomain } from "../constants/Config";

const DealerCreditRequestScreen = () => {
  const [loading, setLoading] = useState(true);
  const [redeemRequestList, setRedeemRequestList] = useState([]);
  const [errorVisible, setErrorVisible] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const setOpenedScreen = async () => {
    try {
      await AsyncStorage.setItem("openedScreen", "login");
    } catch (e) {
      console.error(e);
    }
  };

  const clearAuthStorage = async () => {
    try {
      await AsyncStorage.removeItem("authToken");
    } catch (e) {
      console.error(e);
    }
  };

  const clearUserInfoStorage = async () => {
    try {
      await AsyncStorage.removeItem("userInfo");
    } catch (e) {
      console.error(e);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      getRedeemRequest();
    }, [])
  );

  const handleApprove = (id) => {
    console.log("Approved:", id);
  };

  const handleReject = (id) => {
    console.log("Rejected:", id);
  };

  const getRedeemRequest = () => {
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
              console.log("Redeem Request Response:", couponResponse);
              setRedeemRequestList(couponResponse?.data?.transactions);
              setLoading(false);
            })
            .catch((error) => {
              console.error("API Error:", error);
              setErrorMsg(
                error?.response?.data?.message
                  ? error?.response?.data?.message
                  : error?.response?.statusText
              );
              setErrorVisible(true);
              setLoading(false);
            });
        } else {
          setOpenedScreen();
          clearAuthStorage();
          clearUserInfoStorage();
          setLoading(false);
          navigation.navigate("Login");
        }
      });
    })();
  };

  const profilePressed = () => {
    navigation.push("DealerProfileScreen");
  };

  return (
    <View contentContainerStyle={styles.container}>
      <UserHeader action={profilePressed} />

      <Text style={styles.heading}>Credit Requests</Text>

      {loading ? (
        <LoaderCard />
      ) : (
        <ScrollView contentContainerStyle={styles.container}>
          {redeemRequestList.map((request) => (
            <View key={request._id} style={styles.card}>
              <View style={styles.row}>
                <View style={styles.infoSection}>
                  <Text style={styles.name}>{request?.name}</Text>
                  <Text style={styles.subInfo}>{request?.shop}</Text>
                  <Text style={styles.subInfo}>{request?.address}</Text>
                </View>
                <Text style={styles.amount}>
                  ₹ {request?.amount.toLocaleString()}
                </Text>
              </View>

              <View style={styles.buttonRow}>
                <TouchableOpacity
                  style={[styles.button, styles.approveBtn]}
                  onPress={() => handleApprove(request?._id)}
                >
                  <Text style={styles.buttonText}>Approve</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.button, styles.rejectBtn]}
                  onPress={() => handleReject(request?._id)}
                >
                  <Text style={[styles.buttonText, { color: "#000" }]}>
                    Reject
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </ScrollView>
      )}

      <ErrorModal
        visible={errorVisible}
        message={errorMsg}
        onClose={() => setErrorVisible(false)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 40,
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
