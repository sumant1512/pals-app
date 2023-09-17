import { StyleSheet, View } from "react-native";

import TouchableButton from "../components/PalsTouchableButton";
import BackButton from "../components/BackButton";

export default function UserAddCoupanScreen({ navigation }) {
  const navigateToCreateAccount = () => {
    navigation.push("AccountCreateScreen");
  };

  const navigateToLogin = () => {
    navigation.push("LoginScreen");
  };

  return (
    <View style={styles.container}>
      <BackButton></BackButton>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
});
