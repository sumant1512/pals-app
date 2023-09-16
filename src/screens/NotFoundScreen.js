import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Logo from "../components/Logo";

export default function NotFoundScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Logo bottom={40}></Logo>
      <Text style={styles.title}>This screen doesn't exist.</Text>
      <TouchableOpacity
        onPress={() => navigation.replace("HomeScreen")}
        style={styles.link}
      >
        <Text style={styles.linkText}>Go to home screen!</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
});
