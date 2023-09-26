import { useState } from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";

import UserHeader from "../components/UserHeader";
import BackButton from "../components/BackButton";
import PalsText from "../components/PalsText";
import { serverDomain } from "../constants/Config";

export default function UserProfileScreen({ navigation }) {
  const [loading, setLoading] = useState(true);
  const onLogoutPressed = () => {
    fetch(`${serverDomain}/auth/logout/1`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((resp) => resp.json())
      .then((json) => navigation.push("LoginScreen"))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
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
