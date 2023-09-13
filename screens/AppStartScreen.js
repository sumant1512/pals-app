import { StyleSheet, Pressable, Text } from "react-native";
import { View } from "../components/Themed";

export default function AppStartScreen() {
  return (
    <View>
      <Pressable
        style={styles.container}
        onPress={() => console.log("Pressed")}
      >
        <Text>Get Started</Text>
      </Pressable>
    </View>
  );
}

// Some styles given to button
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#71EC4C",
    alignItems: "center",
    justifyContent: "center",
  },
});
