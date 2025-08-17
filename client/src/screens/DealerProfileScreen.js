import { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  ImageBackground,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CommonActions } from "@react-navigation/native";

import HeaderOverlay from "../components/HeaderOverlay";
import TouchableButton from "../components/PalsTouchableButton";
import { BE_PATH } from "../constants/Config";

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
    fetch(`${BE_PATH}/api/auth/logout`, {
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
      <HeaderOverlay />
      <ScrollView style={styles.scroll}>
        <ImageBackground
          source={require("../assets/profile_bg.png")}
          style={styles.topBackground}
          resizeMode="cover"
        />

        {/* User Image Placeholder */}
        <View style={styles.imagePlaceholder} />

        <View style={styles.form}>
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
            <Text style={styles.value}>{userInfo?.shop}</Text>
          </View>

          <View style={styles.separator} />

          <View style={styles.fieldContainer}>
            <Text style={styles.label}>ADDRESS</Text>
            <Text style={styles.value}>{userInfo?.address}</Text>
          </View>

          <View style={styles.separator} />

          <View style={styles.row}>
            <View style={styles.halfField}>
              <Text style={styles.label}>CITY</Text>
              <Text style={styles.value}>{userInfo?.city}</Text>
            </View>
            <View style={styles.halfField}>
              <Text style={styles.label}>PIN</Text>
              <Text style={styles.value}>{userInfo?.pin}</Text>
            </View>
          </View>

          <View style={styles.separator} />

          <View style={styles.fieldContainer}>
            <Text style={styles.label}>STATE</Text>
            <Text style={styles.value}>{userInfo?.state}</Text>
          </View>

          <View style={styles.separator} />

          <View style={styles.fieldContainer}>
            <Text style={styles.label}>MOBILE NUMBER</Text>
            <Text style={styles.value}>{userInfo?.mobile}</Text>
          </View>

          {/* Log Out button stuck at the bottom of the card */}
          <View style={styles.logoutBtn}>
            <TouchableButton
              label="Log Out"
              theme="outline"
              onPress={onLogoutPressed}
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
    alignItems: "center",
  },
  topBackground: {
    height: 180,
    width: "100%",
    position: "absolute",
    top: 0,
  },
  imagePlaceholder: {
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: "#ccc",
    marginTop: 80,
    marginBottom: 30,
    marginLeft: "auto",
    marginRight: "auto",
    borderWidth: 3,
    borderColor: "#fff",
    zIndex: 1,
  },
  form: {
    width: "100%",
    paddingHorizontal: 20,
    paddingBottom: 85,
  },
  fieldContainer: {
    marginBottom: 10,
  },
  label: {
    fontSize: 12,
    color: "#748390",
    marginBottom: 4,
  },
  value: {
    fontSize: 16,
    fontWeight: "600",
    color: "#014589",
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
    width: "100%",
  },
  logoutBtn: {
    marginTop: 20,
    marginBottom: 20,
  },
});
