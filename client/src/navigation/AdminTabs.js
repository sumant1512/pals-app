// navigation/AdminTabs.js
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import DashboardScreen from "../screens/DashboardScreen";
import CouponsCreateScreen from "../screens/CouponsCreateScreen";
import { Ionicons } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

export default function AdminTabs() {
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
            <Ionicons name="home-outline" size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="CreateQR"
        component={CouponsCreateScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="qr-code-outline" size={24} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
