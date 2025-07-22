import { createStackNavigator } from "@react-navigation/stack";
import { ScrollView } from "react-native";
import LoginScreen from "../screens/LoginScreen";
import AccountVerifyScreen from "../screens/AccountVerifyScreen";
import AccountCreateScreen from "../screens/AccountCreateScreen";
import DashboardScreen from "../screens/DashboardScreen";
import QRsViewScreen from "../screens/QRsViewScreen";
import QRsCreateScreen from "../screens/QRsCreateScreen";
import UserScanCouponScreen from "../screens/UserScanCouponScreen";
import DealerProfileScreen from "../screens/DealerProfileScreen";
import UserProfileSettingsScreen from "../screens/UserProfileSettingsScreen";
import NotFoundScreen from "../screens/NotFoundScreen";
import UserTransactionsScreen from "../screens/UserTransactionsScreen";
import DealerLedgerScreen from "../screens/DealerLedgerScreen";
import DealerCreditRequestScreen from "../screens/DealerCreditRequestScreen";
import DealerTabs from "./DealerTabs";
import AdminTabs from "./AdminTabs";

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <ScrollView contentContainerStyle={{ minHeight: "100%" }}>
      <Stack.Navigator
        initialRouteName="Dealer"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen
          name="AccountVerifyScreen"
          component={AccountVerifyScreen}
        />
        <Stack.Screen name="Dealer" component={DealerTabs} />
        <Stack.Screen name="Admin" component={AdminTabs} />
        {/* <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen
          name="AccountVerifyScreen"
          component={AccountVerifyScreen}
        />
        <Stack.Screen
          name="AccountCreateScreen"
          component={AccountCreateScreen}
        />
        <Stack.Screen
          name="DealerLedgerScreen"
          component={DealerLedgerScreen}
        />
        <Stack.Screen name="DashboardScreen" component={DashboardScreen} />
        <Stack.Screen name="QRsViewScreen" component={QRsViewScreen} />
        <Stack.Screen name="QRsCreateScreen" component={QRsCreateScreen} />
        <Stack.Screen
          name="DealerCreditRequestScreen"
          component={DealerCreditRequestScreen}
        />
        <Stack.Screen
          name="UserScanCouponScreen"
          component={UserScanCouponScreen}
        />
        <Stack.Screen name="DealerProfileScreen" component={DealerProfileScreen} />
        <Stack.Screen
          name="UserProfileSettingsScreen"
          component={UserProfileSettingsScreen}
        />
        <Stack.Screen
          name="UserTransactionsScreen"
          component={UserTransactionsScreen}
        />
        <Stack.Screen name="NotFoundScreen" component={NotFoundScreen} /> */}
      </Stack.Navigator>
    </ScrollView>
  );
};

export default AppNavigator;
