import { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  ScrollView,
  Image,
  Text,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CommonActions } from "@react-navigation/native";

import UserHeader from "../components/UserHeader";
import BackButton from "../components/BackButton";
import TouchableButton from "../components/PalsTouchableButton";
import { serverDomain } from "../constants/Config";

export default function DealerProfileScreen() {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);
  const [userAuthToken, setUserAuthToken] = useState("");
  const [userInfo, setUserInfo] = useState({});

  useEffect(() => {
    getAuthToken();
    getUserInfo();
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

  const getUserInfo = (authToken) => {
    (() => {
      AsyncStorage.getItem("userInfo").then((userInfo) => {
        if (userInfo) {
          const userInfoParsed = JSON.parse(userInfo);
          setUserInfo(userInfoParsed);
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

  const onLogoutPressed = () => {
    fetch(`${serverDomain}/api/auth/logout`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        authorization: `Bearer ${userAuthToken}`,
      },
    })
      .then((resp) => resp.json())
      .then((logoutResponseData) => {
        if (logoutResponseData?.status) {
          clearAuthStorage();
          clearUserInfoStorage();
          setOpenedScreen();
          navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{ name: "Login" }],
            })
          );
        }
      })
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  };

  return (
    <View style={styles.container}>
      <UserHeader />
      <BackButton />

      <ScrollView style={styles.scroll}>
        <View style={styles.card}>
          <Image
            source={require("../assets/profile-placeholder.png")}
            style={styles.profileImage}
          />
          <View style={styles.fieldContainer}>
            <Text style={styles.label}>FULL NAME</Text>
            <Text style={styles.value}>{userInfo?.name}</Text>
          </View>

          <View style={styles.separator} />

          <View style={styles.fieldContainer}>
            <Text style={styles.label}>Designation</Text>
            <Text style={styles.value}>Pals' {userInfo?.userType}</Text>
          </View>

          <View style={styles.separator} />

          <View style={styles.fieldContainer}>
            <Text style={styles.label}>SHOP NAME</Text>
            <Text style={styles.value}>Doe's Supplies</Text>
          </View>

          <View style={styles.separator} />

          <View style={styles.fieldContainer}>
            <Text style={styles.label}>ADDRESS</Text>
            <Text style={styles.value}>123 Main St</Text>
          </View>

          <View style={styles.separator} />

          <View style={styles.row}>
            <View style={styles.halfField}>
              <Text style={styles.label}>CITY</Text>
              <Text style={styles.value}>Dewas</Text>
            </View>
            <View style={styles.halfField}>
              <Text style={styles.label}>PIN</Text>
              <Text style={styles.value}>455001</Text>
            </View>
          </View>

          <View style={styles.separator} />

          <View style={styles.fieldContainer}>
            <Text style={styles.label}>STATE</Text>
            <Text style={styles.value}>Madhya Pradesh</Text>
          </View>

          <View style={styles.separator} />

          <View style={styles.fieldContainer}>
            <Text style={styles.label}>MOBILE NUMBER</Text>
            <Text style={styles.value}>{userInfo?.mobile}</Text>
          </View>

          {/* Log Out button stuck at the bottom of the card */}
          <View>
            <TouchableButton
              label="Log Out"
              theme="outlined"
              action={onLogoutPressed}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  card: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    elevation: 4,
    marginBottom: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    alignSelf: "center",
    marginBottom: 20,
    borderRadius: 50,
  },
  fieldContainer: {
    marginBottom: 10,
  },
  label: {
    fontSize: 12,
    color: "#999",
    marginBottom: 4,
  },
  value: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000",
  },
  separator: {
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    marginVertical: 10,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  halfField: {
    width: "48%",
  },
  scroll: {
    flex: 1,
    marginTop: 10,
  },
});
