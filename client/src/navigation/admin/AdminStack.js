// navigation/AdminStack.js
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import AdminTabs from "./AdminTabs";

import AdminProfileScreen from "../../screens/AdminProfileScreen";
import DealerCreditRequestScreen from "../../screens/DealerCreditRequestScreen";
import AddDealerScreen from "../../screens/AddDealerScreen";
import ViewDealerScreen from "../../screens/ViewDealerScreen";
import DealerLedgerScreen from "../../screens/DealerLedgerScreen";
import UserTransactionsScreen from "../../screens/UserTransactionsScreen";
import QRsViewScreen from "../../screens/CouponsViewScreen";
import CouponsCreateScreen from "../../screens/CouponsCreateScreen";

const Stack = createStackNavigator();

export default function AdminStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {/* Bottom Tabs (Dashboard & CreateQR) */}
      <Stack.Screen name="AdminTabs" component={AdminTabs} />

      {/* Other admin screens (not in bottom tab) */}
      <Stack.Screen name="AdminProfile" component={AdminProfileScreen} />
      <Stack.Screen
        name="DealerCreditRequestScreen"
        component={DealerCreditRequestScreen}
      />
      <Stack.Screen name="AddDealerScreen" component={AddDealerScreen} />
      <Stack.Screen name="ViewDealerScreen" component={ViewDealerScreen} />
      <Stack.Screen name="DealerLedgerScreen" component={DealerLedgerScreen} />
      <Stack.Screen
        name="UserTransactionsScreen"
        component={UserTransactionsScreen}
      />
      <Stack.Screen name="QRsViewScreen" component={QRsViewScreen} />
      <Stack.Screen
        name="CouponsCreateScreen"
        component={CouponsCreateScreen}
      />
    </Stack.Navigator>
  );
}
