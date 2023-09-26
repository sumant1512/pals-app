import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Text, View } from "react-native";

import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { useLoadedAssets } from "./src/hooks/useLoadedAssets";
import StartScreen from "./src/screens/StartScreen";
import LoginScreen from "./src/screens/LoginScreen";
import AccountCreateScreen from "./src/screens/AccountCreateScreen";
import NotFoundScreen from "./src/screens/NotFoundScreen";
import AccountVerifyScreen from "./src/screens/AccountVerifyScreen";
import UserDashboardScreen from "./src/screens/UserDashboardScreen";
import UserAddCoupanScreen from "./src/screens/UserAddCoupanScreen";
import UserProfileScreen from "./src/screens/UserProfileScreen";
import PinForgetScreen from "./src/screens/PinForgetScreen";
import PinResetScreen from "./src/screens/PinResetScreen";

const Stack = createStackNavigator();

export default function App() {
  const isLoadingComplete = useLoadedAssets();
  const [isFirstTimeLoad, setIsFirstTimeLoad] = useState(false);

  const checkForFirstTimeLoaded = async () => {
    const result = await AsyncStorage.getItem("isFirstTimeOpen");
    if (result === null) setIsFirstTimeLoad(true);
  };

  useEffect(() => {
    checkForFirstTimeLoaded();
  }, []);

  if (!isLoadingComplete) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  } else {
    if (isFirstTimeLoad) {
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
            <Stack.Screen
              name="UserProfileScreen"
              component={UserProfileScreen}
            />
            <Stack.Screen name="NotFoundScreen" component={NotFoundScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      );
    } else {
      return (
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="LoginScreen"
            screenOptions={{ headerShown: false }}
          >
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
}
