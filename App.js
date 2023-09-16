import { useColorScheme } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import StartScreen from "./src/screens/StartScreen";
import HomeScreen from "./src/screens/HomeScreen";
import LoginScreen from "./src/screens/LoginScreen";
import CreateAccountScreen from "./src/screens/CreateAccountScreen";
import NotFoundScreen from "./src/screens/NotFoundScreen";
import { useLoadedAssets } from "./src/hooks/useLoadedAssets";

const Stack = createStackNavigator();

export default function App() {
  const isLoadingComplete = useLoadedAssets();
  const colorScheme = useColorScheme();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="StartScreen">
          <Stack.Screen name="StartScreen" component={StartScreen} />
          <Stack.Screen name="HomeScreen" component={HomeScreen} />
          <Stack.Screen name="LoginScreen" component={LoginScreen} />
          <Stack.Screen
            name="CreateAccountScreen"
            component={CreateAccountScreen}
          />
          <Stack.Screen name="NotFoundScreen" component={NotFoundScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
