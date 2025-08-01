import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View, StyleSheet, Platform } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import DashboardScreen from "../../screens/DashboardScreen";
import UserTransactionsScreen from "../../screens/UserTransactionsScreen";
import CouponScanScreen from "../../screens/CouponScanScreen";

const Tab = createBottomTabNavigator();

export default function DealerTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: true,
        tabBarStyle: styles.tabBar,
        tabBarIcon: ({ focused, color }) => {
          let iconName;
          if (route.name === "Dashboard") iconName = "home";
          else if (route.name === "ScanCoupon") iconName = "qr-code";
          else if (route.name === "Transactions") iconName = "trending-up";

          const isCenter = route.name === "ScanCoupon";

          return (
            <View
              style={
                isCenter ? styles.centerIconContainer : styles.iconContainer
              }
            >
              <Ionicons
                name={iconName}
                size={isCenter ? 28 : 24}
                color={focused ? "#014589" : "#748390"}
              />
            </View>
          );
        },
      })}
    >
      <Tab.Screen name="Dashboard" component={DashboardScreen} />
      <Tab.Screen name="ScanCoupon" component={CouponScanScreen} />
      <Tab.Screen name="Transactions" component={UserTransactionsScreen} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    position: "absolute",
    height: 70,
    backgroundColor: "#F1F8FF",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 10,
    borderTopWidth: 0,
  },
  iconContainer: {
    alignItems: "center",
    justifyContent: "center",
    top: 0,
  },
  centerIconContainer: {
    width: 80,
    height: 80,
    borderRadius: 60,
    borderWidth: 1,
    borderColor: "#85B9D7",
    backgroundColor: "#ffffff",
    alignItems: "center",
    justifyContent: "center",
    marginTop: -60,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 10,
  },
});
