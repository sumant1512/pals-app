import { StyleSheet, View } from "react-native";

import TouchableButton from "../components/PalsTouchableButton";
import Logo from "../components/Logo";

export default function HomeScreen({ navigation }) {
  const navigateToCreateAccount = () => {
    navigation.push("AccountCreateScreen");
  };

  const navigateToLogin = () => {
    navigation.push("LoginScreen");
  };

  return (
    <View style={styles.container}>
      <Logo></Logo>
      <TouchableButton
        label="Login"
        theme="light"
        action={navigateToLogin}
      ></TouchableButton>

      <TouchableButton
        label="Create account"
        theme="light"
        action={navigateToCreateAccount}
      ></TouchableButton>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 32,
    justifyContent: "center",
  },
});
