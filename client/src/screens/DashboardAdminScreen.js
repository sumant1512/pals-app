import React from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";
import PalsAdminDashboardCard from "../components/PalsAdminDashboardCard";

const DashboardAdminScreen = () => {
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
            onPress={() => onCardClick("AccountCreateScreen")}
          />
        </View>
        <View style={styles.cardWrapper}>
          <PalsAdminDashboardCard
            label={"View QRs"}
            icon={"qr-code-outline"}
            onPress={() => onCardClick("QRsViewScreen")}
          />
        </View>
        <View style={styles.cardWrapper}>
          <PalsAdminDashboardCard
            label={"Create QRs"}
            icon={"qr-code-outline"}
            onPress={() => onCardClick("QRsCreateScreen")}
          />
        </View>
        <View style={styles.cardWrapper}>
          <PalsAdminDashboardCard
            label={"Dealer Ledger"}
            icon={"trending-up-outline"}
            onPress={() => onCardClick("DealerLedgerScreen")}
          />
        </View>
        <View style={styles.cardWrapper}>
          <PalsAdminDashboardCard
            label={"Dealer Credit Requests"}
            icon={"card-outline"}
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

export default DashboardAdminScreen;
