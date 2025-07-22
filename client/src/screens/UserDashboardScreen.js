import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import axios from "axios";

import TouchableButton from "../components/PalsTouchableButton";
import UserHeader from "../components/UserHeader";
import PalsUrl from "../components/PalsUrl";
import { serverDomain } from "../constants/Config";
import UserRedeemModal from "./UserRedeemModal";

export default function UserDashboardScreen({ navigation }) {
  const [loading, setLoading] = useState(true);
  const [userAuthToken, setUserAuthToken] = useState("");
  const [userInfo, setUserInfo] = useState({});
  const [userCredits, setUserCredits] = useState({});
  const [isModalVisible, setModalVisible] = useState(false);

  const onReddemNowPressed = () => {
    setModalVisible(true);
  };

  const onRedeemConfirm = () => {
    fetch(`${serverDomain}/user/redeemAmount/${userInfo.id}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        authtoken: userAuthToken,
      },
      body: JSON.stringify({
        amount: parseInt(userCredits.availableCredit / 100) * 100,
      }),
    })
      .then((resp) => resp.json())
      .then((userRedeemData) => {
        if (userRedeemData.status) {
          setModalVisible(false);
        }
      })
      .catch((error) => console.error(error.json()))
      .finally(() => setLoading(false));
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const addCoupanPressed = () => {
    navigation.push("UserAddCoupanScreen");
  };

  const setOpenedScreen = async () => {
    try {
      await AsyncStorage.setItem("openedScreen", "login");
    } catch (e) {
      console.error(e);
    }
  };

  const setUserInfoToAsyncStorage = async (userInfo) => {
    try {
      await AsyncStorage.setItem("userInfo", userInfo);
    } catch (e) {
      console.error(e);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      getAuthToken();
    }, [])
  );

  const getAuthToken = () => {
    (() => {
      AsyncStorage.getItem("authToken").then((authToken) => {
        if (authToken) {
          setUserAuthToken(authToken);
          const headers = {
            Accept: "application/json",
            "Content-Type": "application/json",
            authtoken: authToken,
          };
          axios
            .get(`${serverDomain}/user/userInfo`, { headers })
            .then((userInfoResponse) => {
              setUserInfo(userInfoResponse.data.data);
              setUserInfoToAsyncStorage(
                JSON.stringify(userInfoResponse.data.data)
              );
              const userId = userInfoResponse?.data?.data?.id;
              if (userId) {
                return axios.get(
                  `${serverDomain}/user/getUserCredits/${userId}`,
                  { headers }
                );
              }
            })
            .then((userCreditsResponse) => {
              setUserCredits(userCreditsResponse.data.data);
            });
        } else {
          setOpenedScreen();
          navigation.navigate("LoginScreen");
        }
      });
    })();
  };

  const profilePressed = () => {
    navigation.push("UserProfileScreen");
  };

  return (
    <View style={styles.container}>
      <View>
        <UserHeader action={profilePressed}></UserHeader>
        <View style={styles.card}>
          <View style={styles.availableCreditRow}>
            <View style={styles.imageContainer}>
              <Image
                source={require("./../assets/credit_card.png")}
                style={styles.image}
              />
            </View>

            <View style={styles.textContainer}>
              <Text style={styles.heading}>Pals' Credit</Text>
              <Text style={styles.availableCredit}>
                {userCredits?.availableCredit || 0}
              </Text>
            </View>
          </View>
          <View style={styles.credit}>
            <Text style={styles.totalCredit}>
              Total: {userCredits?.totalCredit || 0}
            </Text>
            <Text style={styles.totalDebit}>
              Redemmed: {userCredits?.totalDebit || 0}
            </Text>
          </View>
        </View>
        <View style={styles.redeemNow}>
          <PalsUrl label="Reddem now" action={onReddemNowPressed}></PalsUrl>
        </View>

        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <UserRedeemModal
            isVisible={isModalVisible}
            redemmablePoints={parseInt(userCredits.availableCredit / 100) * 100}
            closeModal={closeModal}
            confirmModal={onRedeemConfirm}
          />
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
    backgroundColor: "#00206F",
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingTop: 35,
    paddingBottom: 15,
  },
  availableCreditRow: {
    flexDirection: "row",
  },
  imageContainer: {
    flex: 1,
  },
  image: {
    width: 100,
    height: 100,
    alignSelf: "center",
  },
  redeemNow: { alignSelf: "center", marginTop: 10 },
  textContainer: {
    flex: 1,
    justifyContent: "center",
  },
  heading: {
    alignSelf: "center",
    color: "#ffffff",
    fontSize: 24,
  },
  availableCredit: {
    alignSelf: "center",
    color: "#ffffff",
    fontWeight: "bold",
    fontSize: 36,
  },
  credit: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  totalCredit: {
    color: "#ffffff",
  },
  totalDebit: {
    color: "#ffffff",
  },
});
