import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Button, Platform } from "react-native";
import { useForm } from "react-hook-form";
import { Camera } from "expo-camera";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import UserHeader from "../components/UserHeader";
import BackButton from "../components/BackButton";
import PalsTextInput from "../components/PalsTextInput";
import TouchableButton from "../components/PalsTouchableButton";
import { serverDomain } from "../constants/Config";

export default function UserScanCouponScreen({ navigation }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [text, setText] = useState("Not yet scanned");
  const isMobile = Platform.OS !== "web";

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      code: "",
    },
  });

  const askForCameraPermission = () => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  };

  const setOpenedScreen = async () => {
    try {
      await AsyncStorage.setItem("openedScreen", "login");
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    askForCameraPermission();
  }, []);

  const profilePressed = () => {
    navigation.getParent()?.navigate("DealerProfile");
  };

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    setText(data);
    redeemCoupon({ code: data });
  };

  const redeemCoupon = async (formData) => {
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
              `${serverDomain}/api/coupon/scan`,
              { code: formData.code },
              { headers }
            )
            .then((userInfoResponse) => {
              navigation.navigate("DashboardScreen");
            })
            .catch((error) => {
              alert(error.response?.data?.message || "An error occurred");
              console.error("API Error:", error);
            });
        } else {
          setOpenedScreen();
          navigation.navigate("Login");
        }
      });
    })();
  };

  if (hasPermission === null && isMobile) {
    return (
      <View style={styles.container}>
        <Text>Requesting for camera permission</Text>
      </View>
    );
  }

  if (hasPermission === false && isMobile) {
    return (
      <View style={styles.container}>
        <Text style={{ margin: 10 }}>No access to camera</Text>
        <Button title={"Allow Camera"} onPress={askForCameraPermission} />
      </View>
    );
  }

  const onRetryPressed = () => {
    setText("Not yet scanned");
    setScanned(false);
  };

  return (
    <View style={styles.container}>
      <View>
        <UserHeader action={profilePressed} />
        <BackButton />

        {isMobile && (
          <View style={styles.barcodebox}>
            <Camera
              style={styles.camera}
              onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
              barCodeScannerSettings={{
                barCodeTypes: [Camera.Constants.BarCodeType.qr],
              }}
            />
          </View>
        )}

        {!isMobile && (
          <PalsTextInput
            name="code"
            placeholder="Coupon Code"
            control={control}
            rules={{
              required: "Coupon code is required.",
            }}
          />
        )}

        {isMobile && <Text style={styles.maintext}>{text}</Text>}
      </View>
      <View style={styles.continueBtn}>
        <TouchableButton
          label={isMobile ? "Retry" : "Submit"}
          theme="filled"
          action={isMobile ? onRetryPressed : handleSubmit(redeemCoupon)}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 40,
    justifyContent: "space-between",
  },
  maintext: {
    fontSize: 16,
    margin: 20,
  },
  barcodebox: {
    alignItems: "center",
    justifyContent: "center",
    height: 300,
    width: "100%",
    overflow: "hidden",
    borderRadius: 30,
    backgroundColor: "tomato",
    marginTop: 10,
  },
});
