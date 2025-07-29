import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import DashboardScreen from "../../screens/DashboardScreen";
import UserTransactionsScreen from "../../screens/UserTransactionsScreen";
import UserScanCouponScreen from "../../screens/UserScanCouponScreen";
import { Ionicons } from "@expo/vector-icons";
import DealerProfileScreen from "../../screens/DealerProfileScreen";

const Tab = createBottomTabNavigator();

export default function DealerTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="Dashboard"
        component={DashboardScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="home" size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="ScanCoupon"
        component={UserScanCouponScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="qr-code" size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Transactions"
        component={UserTransactionsScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="trending-up" size={24} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
