import { StyleSheet, View, TouchableOpacity } from "react-native";

import UserHeader from "../components/UserHeader";
import BackButton from "../components/BackButton";
import PalsText from "../components/PalsText";

export default function UserProfileScreen({ navigation }) {
  const onLogoutPressed = () => {
    navigation.push("LoginScreen");
  };

  return (
    <View style={styles.container}>
      <UserHeader></UserHeader>
      <BackButton></BackButton>

      <View style={styles.list}>
        <TouchableOpacity style={styles.link}>
          <PalsText label="Profile Settings" type="p3"></PalsText>
        </TouchableOpacity>
        <TouchableOpacity style={styles.link} onPress={onLogoutPressed}>
          <PalsText label="Logout" type="p3"></PalsText>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  list: {
    marginTop: 24,
  },
  link: {
    borderBottomWidth: 1,
    borderColor: "#E6E6E6",
    marginTop: 16,
  },
});
