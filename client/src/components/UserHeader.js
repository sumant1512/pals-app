import { useNavigation } from "@react-navigation/native";
import { View, Image, StyleSheet, Pressable } from "react-native";

import { Ionicons } from "@expo/vector-icons";

export default function UserHeader() {
  const navigation = useNavigation();

  const profilePressed = () => {
    navigation.navigate("DealerProfile");
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("./../assets/pals_paint.png")}
        style={styles.logo}
      />
      <Pressable style={styles.circleButton} onPress={profilePressed}>
        <Ionicons name="person" size={24} color="#014589" />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 45,
    marginBottom: 25,
    marginHorizontal: 20,
    alignItems: "center",
  },
  logo: {
    height: 50,
    width: 160,
  },
  circleButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
