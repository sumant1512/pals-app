import { useEffect, useState } from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useForm } from "react-hook-form";

import UserHeader from "../components/UserHeader";
import BackButton from "../components/BackButton";
import PalsText from "../components/PalsText";
import PalsTextInput from "../components/PalsTextInput";
import TouchableButton from "../components/PalsTouchableButton";
import { serverDomain } from "../constants/Config";

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
      upi: "",
      nameOnBankAccount: "",
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
          navigation.navigate("UserProfileScreen");
        }
      })
      .catch((error) => console.error(error.json()))
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
      </View>

      <View>
        <PalsTextInput
          name="name"
          placeholder="Full name"
          control={control}
          rules={{ required: "Full name is required." }}
        />

        <PalsTextInput
          name="upi"
          placeholder="UPI"
          control={control}
          rules={{ required: "UPI is required." }}
        />

        <PalsTextInput
          name="nameOnBankAccount"
          placeholder="Name on Bank Account"
          control={control}
          rules={{ required: "Name on Bank account is required." }}
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
  list: {
    marginTop: 24,
  },
  link: {
    borderBottomWidth: 1,
    borderColor: "#E6E6E6",
    marginTop: 16,
    alignSelf: "center",
  },
});
