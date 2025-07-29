import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import PalsAdminDashboardCard from "../components/PalsAdminDashboardCard";

const AdminDashboardScreen = () => {
  const navigation = useNavigation();

  const onCardClick = (screen) => {
    navigation.getParent()?.navigate(screen);
  };

  return (
    <View style={styles.container}>
      <View style={styles.grid}>
        <View style={styles.cardWrapper}>
          <PalsAdminDashboardCard
            label={"+ Dealers"}
            icon={"person-add"}
            onPress={() => onCardClick("AddDealerScreen")}
          />
        </View>
        <View style={styles.cardWrapper}>
          <PalsAdminDashboardCard
            label={"View Dealers"}
            icon={"person"}
            onPress={() => onCardClick("ViewDealerScreen")}
          />
        </View>
        <View style={styles.cardWrapper}>
          <PalsAdminDashboardCard
            label={"View Coupons"}
            icon={"qr-code"}
            onPress={() => onCardClick("QRsViewScreen")}
          />
        </View>
        <View style={styles.cardWrapper}>
          <PalsAdminDashboardCard
            label={"Create Coupons"}
            icon={"qr-code"}
            onPress={() => onCardClick("CouponsCreateScreen")}
          />
        </View>
        <View style={styles.cardWrapper}>
          <PalsAdminDashboardCard
            label={"Dealer Ledger"}
            icon={"trending-up"}
            onPress={() => onCardClick("DealerLedgerScreen")}
          />
        </View>
        <View style={styles.cardWrapper}>
          <PalsAdminDashboardCard
            label={"Dealer Credit Requests"}
            icon={"card"}
            onPress={() => onCardClick("DealerCreditRequestScreen")}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  cardWrapper: {
    width: "30%", // roughly 1/3 with spacing
    marginBottom: 16,
  },
});

export default AdminDashboardScreen;
