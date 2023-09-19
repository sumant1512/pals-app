import { useColorScheme } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import StartScreen from "./src/screens/StartScreen";
import HomeScreen from "./src/screens/HomeScreen";
import LoginScreen from "./src/screens/LoginScreen";
import AccountCreateScreen from "./src/screens/AccountCreateScreen";
import NotFoundScreen from "./src/screens/NotFoundScreen";
import { useLoadedAssets } from "./src/hooks/useLoadedAssets";
import AccountVerifyScreen from "./src/screens/AccountVerifyScreen";
import UserDashboardScreen from "./src/screens/UserDashboardScreen";
import UserAddCoupanScreen from "./src/screens/UserAddCoupanScreen";
import UserProfileScreen from "./src/screens/UserProfileScreen";
import PasswordForgetScreen from "./src/screens/PasswordForgetScreen";
import PasswordSetScreen from "./src/screens/PasswordSetScreen";
import PasswordForgetVerifyScreen from "./src/screens/PasswordForgetVerifyScreen";
import LoginVerifyScreen from "./src/screens/LoginVerifyScreen";

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
          initialRouteName="UserDashboardScreen"
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name="StartScreen" component={StartScreen} />
          <Stack.Screen name="LoginScreen" component={LoginScreen} />
          <Stack.Screen
            name="LoginVerifyScreen"
            component={LoginVerifyScreen}
          />
          <Stack.Screen
            name="AccountCreateScreen"
            component={AccountCreateScreen}
          />
          <Stack.Screen
            name="AccountVerifyScreen"
            component={AccountVerifyScreen}
          />
          <Stack.Screen
            name="PasswordForgetScreen"
            component={PasswordForgetScreen}
          />
          <Stack.Screen
            name="PasswordForgetVerifyScreen"
            component={PasswordForgetVerifyScreen}
          />
          <Stack.Screen
            name="PasswordSetScreen"
            component={PasswordSetScreen}
          />
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
