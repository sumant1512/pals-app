import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import DealerTabs from "./DealerTabs";

import DealerProfileScreen from "../../screens/DealerProfileScreen";

const Stack = createStackNavigator();

export default function DealerStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {/* Bottom Tabs (Dashboard & CreateQR) */}
      <Stack.Screen name="DealerTabs" component={DealerTabs} />

      {/* Other dealer screens (not in bottom tab) */}
      <Stack.Screen name="DealerProfile" component={DealerProfileScreen} />
    </Stack.Navigator>
  );
}
