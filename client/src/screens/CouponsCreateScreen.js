import React, { useState } from "react";
import { StyleSheet, View, Text, ScrollView, SafeAreaView } from "react-native";
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

export default function CreateQRsScreen() {
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
      amount: "",
      count: "",
    },
  });

  const setOpenedScreen = async () => {
    try {
      await AsyncStorage.setItem("openedScreen", "login");
    } catch (e) {
      console.error(e);
    }
  };

  const onCreateCouponPressed = async (formData) => {
    (() => {
      AsyncStorage.getItem("authToken").then((authToken) => {
        if (authToken) {
          const headers = {
            Accept: "application/json",
            "Content-Type": "application/json",
            authorization: `Bearer ${authToken}`,
          };
          console.log("Form Data:", formData);
          axios
            .post(
              `${serverDomain}/api/coupon/generate`,
              { ...formData },
              { headers }
            )
            .then((userInfoResponse) => {
              console.log("User Info Response:", userInfoResponse);
              if (userInfoResponse.data.status) {
                navigation.navigate("DashboardScreen");
              }
            })
            .catch((error) => {
              setErrorMsg(error?.response?.data?.message);
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

        <PalsText label="Create Coupons" type="h1"></PalsText>
        <PalsTextInput
          name="amount"
          placeholder="Amount"
          control={control}
          rules={{ required: "Amount is required." }}
        />

        <PalsTextInput
          name="count"
          placeholder="Count"
          control={control}
          rules={{ required: "Count is required." }}
        />

        <View style={styles.continueBtn}>
          <TouchableButton
            label="Create coupon"
            theme="filled"
            onPress={handleSubmit(onCreateCouponPressed)}
          ></TouchableButton>
        </View>

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
