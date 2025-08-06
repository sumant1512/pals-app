import { useNavigation } from "@react-navigation/native";
import { View, Image, StyleSheet, TouchableOpacity } from "react-native";

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
      <TouchableOpacity style={styles.imgContainer} onPress={profilePressed}>
        <Ionicons
          style={styles.userLogo}
          name={"person-circle-outline"}
          size={30}
          color="#176B87"
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 30,
    marginHorizontal: 20,
    alignItems: "center",
  },
  logo: {
    height: 50,
    width: 160,
  },
  imgContainer: {
    backgroundColor: "#ffffff",
    height: 40,
    width: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
  },
  userLogo: {
    marginTop: 1.5,
  },
});
