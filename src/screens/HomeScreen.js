import { StyleSheet } from "react-native";

import { View } from "../components/Themed";
import TouchableButton from "../components/PalsTouchableButton";

export default function HomeScreen() {
  const createAccount = () => {
    alert("Create account");
  };

  return (
    <View style={styles.container}>
      <TouchableButton
        label="Login"
        theme="light"
        action={createAccount}
      ></TouchableButton>

      <TouchableButton
        label="Create account"
        theme="light"
        action={createAccount}
      ></TouchableButton>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: "center",
  },
});
