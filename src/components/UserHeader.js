import { useNavigation } from "@react-navigation/native";
import { View, Image, StyleSheet, TouchableOpacity } from "react-native";

export default function UserHeader({ action }) {
  return (
    <View style={styles.container}>
      <Image
        source={require("./../assets/pals_paint.png")}
        style={styles.logo}
      />
      <TouchableOpacity style={styles.imgContainer} onPress={action}>
        <Image
          source={require("./../assets/user_avtar.png")}
          style={styles.userImage}
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
  },
  logo: {
    height: 60,
    width: 150,
  },
  imgContainer: {
    alignSelf: "center",
  },
  userImage: {
    height: 30,
    width: 30,
    alignSelf: "center",
    marginRight: 20,
  },
});
