import { useColorScheme } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import StartScreen from "./src/screens/StartScreen";
import LoginScreen from "./src/screens/LoginScreen";
import AccountCreateScreen from "./src/screens/AccountCreateScreen";
import NotFoundScreen from "./src/screens/NotFoundScreen";
import { useLoadedAssets } from "./src/hooks/useLoadedAssets";
import AccountVerifyScreen from "./src/screens/AccountVerifyScreen";
import UserDashboardScreen from "./src/screens/UserDashboardScreen";
import UserAddCoupanScreen from "./src/screens/UserAddCoupanScreen";
import UserProfileScreen from "./src/screens/UserProfileScreen";
import PinForgetScreen from "./src/screens/PinForgetScreen";
import PinSetScreen from "./src/screens/PinSetScreen";
import PinForgetVerifyScreen from "./src/screens/PinForgetVerifyScreen";
import LoginPinScreen from "./src/screens/LoginPinScreen";
import AccountSetPinScreen from "./src/screens/AccountSetPinScreen";

const Stack = createStackNavigator();

export default function App() {
  const isLoadingComplete = useLoadedAssets();
  const colorScheme = useColorScheme();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="AccountCreateScreen"
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name="StartScreen" component={StartScreen} />
          <Stack.Screen name="LoginScreen" component={LoginScreen} />
          <Stack.Screen name="LoginPinScreen" component={LoginPinScreen} />
          <Stack.Screen
            name="AccountCreateScreen"
            component={AccountCreateScreen}
          />
          <Stack.Screen
            name="AccountVerifyScreen"
            component={AccountVerifyScreen}
          />
          <Stack.Screen
            name="AccountSetPinScreen"
            component={AccountSetPinScreen}
          />
          <Stack.Screen name="PinForgetScreen" component={PinForgetScreen} />
          <Stack.Screen
            name="PinForgetVerifyScreen"
            component={PinForgetVerifyScreen}
          />
          <Stack.Screen name="PinSetScreen" component={PinSetScreen} />
          <Stack.Screen
            name="UserDashboardScreen"
            component={UserDashboardScreen}
          />
          <Stack.Screen
            name="UserAddCoupanScreen"
            component={UserAddCoupanScreen}
          />
          <Stack.Screen
            name="UserProfileScreen"
            component={UserProfileScreen}
          />
          <Stack.Screen name="NotFoundScreen" component={NotFoundScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
