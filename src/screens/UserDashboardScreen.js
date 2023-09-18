import { StyleSheet, View, Text, Image } from "react-native";

import TouchableButton from "../components/PalsTouchableButton";
import UserHeader from "../components/UserHeader";

export default function UserDashboardScreen({ navigation }) {
  const addCoupanPressed = () => {
    navigation.push("UserAddCoupanScreen");
  };

  const profilePressed = () => {
    navigation.push("UserProfileScreen");
  };

  return (
    <View style={styles.container}>
      <View>
        <UserHeader action={profilePressed}></UserHeader>
        <View style={styles.card}>
          <View style={styles.imageContainer}>
            <Image
              source={require("./../assets/credit_card.png")}
              style={styles.image}
            />
          </View>

          <View style={styles.textContainer}>
            <Text style={styles.heading}>Pals' Credit</Text>
            <Text style={styles.credit}>986</Text>
          </View>
        </View>
      </View>
      <View>
        <TouchableButton
          label="Add Coupan"
          theme="filled"
          action={addCoupanPressed}
        ></TouchableButton>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 40,
    flex: 1,
    justifyContent: "space-between",
  },
  card: {
    flexDirection: "row",
    backgroundColor: "#00206F",
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 35,
  },
  imageContainer: {
    flex: 1,
  },
  image: {
    width: 100,
    height: 100,
    alignSelf: "center",
  },
  textContainer: {
    flex: 1,
    justifyContent: "center",
  },
  heading: {
    alignSelf: "center",
    color: "#ffffff",
    fontSize: 24,
  },
  credit: {
    alignSelf: "center",
    color: "#ffffff",
    fontWeight: "bold",
    fontSize: 36,
  },
});
