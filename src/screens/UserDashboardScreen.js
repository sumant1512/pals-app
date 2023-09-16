import { StyleSheet, View } from "react-native";
import PalsText from "../components/PalsText";

export default function UserDashboardScreen({ navigation }) {
  const navigateToCreateAccount = () => {
    navigation.push("AccountCreateScreen");
  };

  const navigateToLogin = () => {
    navigation.push("LoginScreen");
  };

  return (
    <View style={styles.container}>
      <PalsText label="User Dashboard" type="h1"></PalsText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: "center",
    alignItems: "center",
  },
});
