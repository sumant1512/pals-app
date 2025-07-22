import React, { useState } from "react";
import { StyleSheet, ScrollView, View } from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

import { serverDomain } from "../constants/Config";
import UserHeader from "../components/UserHeader";
import LoaderCard from "../components/PalsLoaderCard";
import ErrorModal from "../components/PalsErrorModal";
import DealerEntryCard from "./DealerEntryCard";

export default function DealerLedgerScreen() {
  const [loading, setLoading] = useState(true);
  const [dealerLedger, setDealerLedger] = useState([]);
  const [errorVisible, setErrorVisible] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const navigation = useNavigation();

  useFocusEffect(
    React.useCallback(() => {
      getDealersLedger();
    }, [])
  );

  const navigateToUserTransactions = (data) => {
    navigation.push("UserTransactionsScreen", {
      userId: data,
    });
  };

  const getDealersLedger = () => {
    (() => {
      AsyncStorage.getItem("authToken").then((authToken) => {
        if (authToken) {
          const headers = {
            Accept: "application/json",
            "Content-Type": "application/json",
            authorization: `Bearer ${authToken}`,
          };
          axios
            .get(`${serverDomain}/api/dealer/get-dealer-ledger`, { headers })
            .then((userInfoResponse) => {
              setDealerLedger(userInfoResponse?.data?.dealers || []);
              setLoading(false);
            })
            .catch((error) => {
              console.error("API Error:", error);
              setErrorMsg(
                error?.response?.data?.message || "Failed to load user info."
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
    <View style={styles.container}>
      <UserHeader action={profilePressed} />

      {loading ? (
        <LoaderCard />
      ) : (
        <ScrollView contentContainerStyle={styles.container}>
          {dealerLedger.map((dealer, index) => (
            <DealerEntryCard
              key={dealer._id || index}
              name={dealer.name}
              shop={dealer.shop || "Testing shop"}
              address={dealer.address || "Testing address"}
              availableCredit={dealer.availableCredit}
              totalCredit={dealer.totalCredit}
              totalDebit={dealer.totalDebit}
              onPress={() => navigateToUserTransactions(dealer._id)}
            />
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
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 40,
  },
});
