import { StyleSheet, View } from "react-native";
import PalsText from "../components/PalsText";
import BackButton from "../components/BackButton";

export default function UserDashboardScreen({ navigation }) {
  const navigateToCreateAccount = () => {
    navigation.push("AccountCreateScreen");
  };

  const navigateToLogin = () => {
    navigation.push("LoginScreen");
  };

  return (
    <View style={styles.container}>
      <BackButton action={navigation.goBack} />
      <PalsText label="User Dashboard" type="h1"></PalsText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 32,
    justifyContent: "center",
    alignItems: "center",
  },
});
