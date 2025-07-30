import React, { useState } from "react";
import { StyleSheet, View, Text, ScrollView, SafeAreaView } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useForm } from "react-hook-form";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";

import PalsText from "../components/PalsText";
import PalsSelectInput from "../components/PalsSelectInput";
import UserHeader from "../components/UserHeader";
import BackButton from "../components/BackButton";
import PalsTextInput from "../components/PalsTextInput";
import TouchableButton from "../components/PalsTouchableButton";
import ErrorModal from "../components/PalsErrorModal";
import { serverDomain } from "../constants/Config";

export default function AddDealerScreen() {
  const [errorVisible, setErrorVisible] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [selectedUserType, setSelectedUserType] = useState(null);

  const navigation = useNavigation();

  const userTypes = [
    { label: "Dealer", value: "Dealer" },
    { label: "Admin", value: "Admin" },
  ];

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      userType: "Dealer",
      name: "Chetan Kulchania",
      mobile: "9111097770",
      shop: "Om Building materials",
      address: "Infront of govt bima, Ujjain Road",
      pin: "455001",
      city: "Dewas",
      state: "Madhya Pradesh",
    },
  });

  const setOpenedScreen = async () => {
    try {
      await AsyncStorage.setItem("openedScreen", "login");
    } catch (e) {
      console.error(e);
    }
  };

  const onRegisterPressed = async (formData) => {
    (() => {
      AsyncStorage.getItem("authToken").then((authToken) => {
        if (authToken) {
          const headers = {
            Accept: "application/json",
            "Content-Type": "application/json",
            authorization: `Bearer ${authToken}`,
          };
          axios
            .post(
              `${serverDomain}/api/dealer/add-dealer`,
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
              setErrorMsg(
                error?.response?.data?.message ||
                  "Something went wrong at client side."
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
        <PalsText label="Add Dealer" type={"h5"} />

        <PalsSelectInput
          name="userType"
          label="Select User Type"
          control={control}
          data={userTypes}
          onSelect={setSelectedUserType}
        />

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

        <PalsTextInput
          name="shop"
          placeholder="Shop Name"
          control={control}
          rules={{ required: "Shop name is required." }}
        />

        <PalsTextInput
          name="address"
          placeholder="Address"
          control={control}
          rules={{ required: "Address is required." }}
        />

        <PalsTextInput
          name="pin"
          placeholder="Pin"
          control={control}
          rules={{ required: "Pin is required." }}
        />

        <PalsTextInput
          name="city"
          placeholder="City"
          control={control}
          rules={{ required: "City is required." }}
        />

        <PalsTextInput
          name="state"
          placeholder="State"
          control={control}
          rules={{ required: "State is required." }}
        />

        <View style={styles.continueBtn}>
          <TouchableButton
            label="Register"
            theme="filled"
            action={handleSubmit(onRegisterPressed)}
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
