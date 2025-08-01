import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  ImageBackground,
  Dimensions,
  Pressable,
  Text,
  Button,
  Platform,
} from "react-native";
import { useForm } from "react-hook-form";
import { Camera } from "expo-camera";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

import PalsTextInput from "../components/PalsTextInput";
import PalsTouchableButton from "../components/PalsTouchableButton";
import HeaderOverlay from "../components/HeaderOverlay";

import ErrorModal from "../components/PalsErrorModal";

const { width } = Dimensions.get("window");

import { serverDomain } from "../constants/Config";
const SCAN_BOX_SIZE = width * 0.6;

export default function CoupanScanScreen({ navigation }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [errorVisible, setErrorVisible] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
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
    isMobile && askForCameraPermission();
  }, []);

  const profilePressed = () => {
    navigation.navigate("DealerProfile");
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
            .then((scanApiResponse) => {
              if (scanApiResponse?.data?.status) {
                navigation.navigate("Dashboard");
              }
            })
            .catch((error) => {
              console.error("API Error:", error);
              setErrorMsg(error.response?.data?.message || "An error occurred");
              setErrorVisible(true);
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
    <ImageBackground
      source={require("../assets/scan_bg.png")} // 🖼️ Use your background image here
      style={styles.background}
      resizeMode="cover"
    >
      <HeaderOverlay />

      <View style={styles.container}>
        <Pressable style={styles.circleButton} onPress={profilePressed}>
          <Ionicons name="person" size={24} color="#014589" />
        </Pressable>
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

        <View>
          {!isMobile && (
            <PalsTextInput
              name="code"
              control={control}
              label="Coupon Code"
              placeholder="Enter Coupon Code"
              maxLength={20}
              placeholderTextColor="#ffffff"
              textColor="#ffffff"
              rules={{
                required: "Coupon Code is required.",
              }}
            />
          )}

          {isMobile && <Text style={styles.notScannedText}>{text}</Text>}

          <View style={styles.retryBtn}>
            <PalsTouchableButton
              label={isMobile ? "Retry" : "Submit"}
              theme="light"
              onPress={isMobile ? onRetryPressed : handleSubmit(redeemCoupon)}
            />
          </View>
        </View>

        <ErrorModal
          visible={errorVisible}
          message={errorMsg}
          onClose={() => setErrorVisible(false)}
        />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  container: {
    flex: 1,
    paddingTop: 100,
    paddingHorizontal: 20,
    alignItems: "center",
    position: "relative",
    justifyContent: "space-between",
  },
  circleButton: {
    position: "absolute",
    top: 60,
    right: 20,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 10,
    elevation: 4,
  },
  barcodebox: {
    alignItems: "center",
    justifyContent: "center",
    height: 300,
    width: SCAN_BOX_SIZE,
    height: SCAN_BOX_SIZE,
    overflow: "hidden",
    borderRadius: 30,
    backgroundColor: "tomato",
    marginTop: 30,
  },
  retryBtn: {
    marginBottom: 150,
    marginTop: 16,
  },
  notScannedText: {
    fontSize: 16,
    fontWeight: 400,
    color: "#ffffff",
    marginTop: 16,
  },
});
