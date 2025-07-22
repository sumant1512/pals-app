import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import StartScreen from "../screens/StartScreen";
import LoginScreen from "../screens/LoginScreen";
import AccountCreateScreen from "../screens/AccountCreateScreen";
import AccountVerifyScreen from "../screens/AccountVerifyScreen";
import PinForgetScreen from "../screens/PinForgetScreen";
import PinResetScreen from "../screens/PinResetScreen";
import UserDashboardScreen from "../screens/UserDashboardScreen";
import UserAddCoupanScreen from "../screens/UserAddCoupanScreen";
import UserProfileScreen from "../screens/UserProfileScreen";
import UserProfileSettingsScreen from "../screens/UserProfileSettingsScreen";
import NotFoundScreen from "../screens/NotFoundScreen";
import UserTransactionsScreen from "../screens/UserTransactionsScreen";

const Stack = createStackNavigator();

const StartAppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="StartScreen"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="StartScreen" component={StartScreen} />
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen
          name="AccountCreateScreen"
          component={AccountCreateScreen}
        />
        <Stack.Screen
          name="AccountVerifyScreen"
          component={AccountVerifyScreen}
        />
        <Stack.Screen name="PinForgetScreen" component={PinForgetScreen} />
        <Stack.Screen name="PinResetScreen" component={PinResetScreen} />
        <Stack.Screen
          name="UserDashboardScreen"
          component={UserDashboardScreen}
        />
        <Stack.Screen
          name="UserAddCoupanScreen"
          component={UserAddCoupanScreen}
        />
        <Stack.Screen name="UserProfileScreen" component={UserProfileScreen} />
        <Stack.Screen
          name="UserProfileSettingsScreen"
          component={UserProfileSettingsScreen}
        />
        <Stack.Screen
          name="UserTransactionsScreen"
          component={UserTransactionsScreen}
        />
        <Stack.Screen name="NotFoundScreen" component={NotFoundScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StartAppNavigator;
