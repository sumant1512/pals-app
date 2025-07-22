import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { useLoadedAssets } from "./src/hooks/useLoadedAssets";
import AppNavigator from "./src/navigation/AppNavigator";
import UserAppNavigator from "./src/navigation/UserAppNavigator";
import StartAppNavigator from "./src/navigation/StartAppNavigator";

export default function App() {
  const isLoadingComplete = useLoadedAssets();
  const [openedScreen, setOpenedScreen] = useState("start");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const checkOpenedScreen = async () => {
    const result = await AsyncStorage.getItem("openedScreen");
    setOpenedScreen(result);
  };

  useEffect(() => {
    checkOpenedScreen();
  }, []);

  if (openedScreen === "login") {
    return <AppNavigator />;
  } else if (openedScreen === "user") {
    return <UserAppNavigator />;
  } else {
    return <StartAppNavigator />;
  }
}
