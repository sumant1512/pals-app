import { useEffect, useState } from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useForm } from "react-hook-form";

import AsyncStorage from "@react-native-async-storage/async-storage";

import { serverDomain } from "../constants/Config";

import UserHeader from "../components/UserHeader";
import BackButton from "../components/BackButton";
import PalsText from "../components/PalsText";
import PalsTextInput from "../components/PalsTextInput";
import TouchableButton from "../components/PalsTouchableButton";

export default function UserProfileSettingsScreen() {
  const navigation = useNavigation();
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
    },
  });

  const [loading, setLoading] = useState(true);
  const [userAuthToken, setUserAuthToken] = useState("");
  const [userInfo, setUserInfo] = useState({});

  useEffect(() => {
    getAuthToken();
    getUserInfo();
  }, []);

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
          setValue("name", userInfoParsed.name || "");
          setValue("upi", userInfoParsed.upi || "");
          setValue("nameOnBankAccount", userInfoParsed.nameOnBankAccount || "");
          setUserInfo(userInfoParsed);
        }
      });
    })();
  };

  const onUpdatePressed = (data) => {
    fetch(`${serverDomain}/user/updateUserInfo/${userInfo.id}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        authtoken: userAuthToken,
      },
      body: JSON.stringify({
        ...data,
      }),
    })
      .then((resp) => resp.json())
      .then((updateUserInfo) => {
        if (updateUserInfo.status) {
          navigation.navigate("DealerProfileScreen");
        }
      })
      .catch((error) => console.error(error.json()))
      .finally(() => setLoading(false));
  };

  return (
    <View style={styles.container}>
      <UserHeader />
      <BackButton />

      <View style={styles.heading}>
        <PalsText label="Profile Settings" type="p3"></PalsText>
      </View>

      <View>
        <PalsTextInput
          name="name"
          placeholder="Full name"
          control={control}
          rules={{ required: "Full name is required." }}
        />

        <View style={styles.continueBtn}>
          <TouchableButton
            label="Update"
            theme="filled"
            action={handleSubmit(onUpdatePressed)}
          ></TouchableButton>
        </View>
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
  heading: {
    marginTop: 24,
  },
  continueBtn: {
    marginTop: 16,
  },
});
