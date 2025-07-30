import { createStackNavigator } from "@react-navigation/stack";
import { ScrollView } from "react-native";

import LoginScreen from "../screens/LoginScreen";
import DealerStack from "./dealer/DealerStack";
import AdminStack from "./admin/AdminStack"; // <-- use this instead of AdminTabs

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <ScrollView contentContainerStyle={{ minHeight: "100%" }}>
      <Stack.Navigator
        initialRouteName="Dealer"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Dealer" component={DealerStack} />
        <Stack.Screen name="Admin" component={AdminStack} />
      </Stack.Navigator>
    </ScrollView>
  );
};

export default AppNavigator;
