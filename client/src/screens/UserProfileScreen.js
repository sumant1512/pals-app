import { useEffect, useState } from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import UserHeader from "../components/UserHeader";
import BackButton from "../components/BackButton";
import PalsText from "../components/PalsText";
import { serverDomain } from "../constants/Config";

export default function UserProfileScreen() {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);
  const [userAuthToken, setUserAuthToken] = useState("");

  useEffect(() => {
    getAuthToken();
  }, []);

  const clearAuthStorage = async () => {
    try {
      await AsyncStorage.removeItem("authToken");
    } catch (e) {
      console.error(e);
    }
  };

  const clearUserInfoStorage = async () => {
    try {
      await AsyncStorage.removeItem("userInfo");
    } catch (e) {
      console.error(e);
    }
  };

  const getAuthToken = () => {
    (() => {
      AsyncStorage.getItem("authToken").then((authToken) => {
        if (authToken) {
          setUserAuthToken(authToken);
        }
      });
    })();
  };

  const setOpenedScreen = async () => {
    try {
      await AsyncStorage.setItem("openedScreen", "login");
    } catch (e) {
      console.error(e);
    }
  };

  const onLogoutPressed = (authtoken) => {
    fetch(`${serverDomain}/user/logout/1`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        authtoken: userAuthToken,
      },
    })
      .then((resp) => resp.json())
      .then((logoutResponseData) => {
        if (logoutResponseData?.status) {
          clearAuthStorage();
          clearUserInfoStorage();
          setOpenedScreen();
          navigation.navigate("LoginScreen");
        }
      })
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  };

  const onProfileSettingsPressed = () => {
    navigation.navigate("UserProfileSettingsScreen");
  };

  const onUserTransactionPressed = () => {
    navigation.navigate("UserTransactionsScreen");
  };

  return (
    <View style={styles.container}>
      <UserHeader></UserHeader>
      <BackButton></BackButton>

      <View style={styles.list}>
        <TouchableOpacity
          style={styles.link}
          onPress={onProfileSettingsPressed}
        >
          <PalsText label="Profile Settings" type="p3"></PalsText>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.link}
          onPress={onUserTransactionPressed}
        >
          <PalsText label="User Transactions" type="p3"></PalsText>
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
