import { StyleSheet, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import TouchableButton from "../components/PalsTouchableButton";
import Logo from "../components/Logo";

export default function StartScreen() {
  const navigation = useNavigation();
  const getStarted = () => {
    AsyncStorage.setItem("isFirstTimeOpen", "no");
    navigation.navigate("LoginScreen");
  };

  return (
    <View style={styles.container}>
      <Logo></Logo>

      <TouchableButton
        label="Get started"
        theme="filled"
        action={getStarted}
      ></TouchableButton>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 40,
    justifyContent: "center",
  },
});
