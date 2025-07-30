import React, { useState } from "react";
import { StyleSheet, View, Text, ScrollView, SafeAreaView } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useForm } from "react-hook-form";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";

import PalsText from "../components/PalsText";
import UserHeader from "../components/UserHeader";
import BackButton from "../components/BackButton";
import PalsTextInput from "../components/PalsTextInput";
import TouchableButton from "../components/PalsTouchableButton";
import ErrorModal from "../components/PalsErrorModal";
import { serverDomain } from "../constants/Config";

export default function ViewDealerScreen() {
  const [errorVisible, setErrorVisible] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const navigation = useNavigation();
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "Sumant Mishra",
      mobile: "9579310997",
    },
  });

  const setOpenedScreen = async () => {
    try {
      await AsyncStorage.setItem("openedScreen", "login");
    } catch (e) {
      console.error(e);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchDealers();
    }, [])
  );

  const fetchDealers = async (formData) => {
    (() => {
      AsyncStorage.getItem("authToken").then((authToken) => {
        if (authToken) {
          const headers = {
            Accept: "application/json",
            "Content-Type": "application/json",
            authorization: `Bearer ${authToken}`,
          };
          axios
            .get(`${serverDomain}/api/dealer/get-dealers`, { headers })
            .then((userInfoResponse) => {
              console.log("User Info Response:", userInfoResponse);
            })
            .catch((error) => {
              setErrorMsg(
                error?.response?.data?.message || "Client Side error."
              );
              setErrorVisible(true);
            });
        } else {
          setOpenedScreen();
          navigation.navigate("Login");
        }
      });
    })();
  };

  const profilePressed = () => {
    navigation.navigate("AdminProfile");
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <UserHeader action={profilePressed} />
        <BackButton />
        <PalsText label="View Dealer" type={"h3"} />

        <PalsTextInput
          name="name"
          placeholder="Full name"
          control={control}
          rules={{ required: "Full name is required." }}
        />

        <PalsTextInput
          name="mobile"
          placeholder="Mobile"
          control={control}
          rules={{ required: "Mobile is required." }}
        />

        <ErrorModal
          visible={errorVisible}
          message={errorMsg}
          onClose={() => setErrorVisible(false)}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    paddingHorizontal: 20,
  },
  scrollView: {
    marginHorizontal: 20,
  },
  image: {
    marginTop: 60,
  },
  continueBtn: { marginTop: 20 },
});
