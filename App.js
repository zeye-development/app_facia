import React, { useState, useEffect } from "react";
import * as Font from "expo-font";
import { Notifications } from "expo";
import * as Permissions from "expo-permissions";
import { AppLoading } from "expo";

import Router from "./Router";
import { AsyncStorage } from "react-native";

export default function App() {
  useEffect(() => {
    getToken();
  });

  // Notifications getToken
  const getToken = async () => {
    const { status } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
    if (status !== "granted") {
      return;
    }
    try{
    const token = await Notifications.getExpoPushTokenAsync();
    AsyncStorage.setItem('tokenPush', token)
    console.log(token);
    }
    catch{}
    
  };

  const fetchFonts = () => {
    return Font.loadAsync({
      PoppinsMedium: require("./assets/fonts/Poppins-Medium.ttf"),
      PoppinsBold: require("./assets/fonts/Poppins-Bold.ttf"),
      PoppinsSemiBold: require("./assets/fonts/Poppins-SemiBold.ttf"),
      PoppinsRegular: require("./assets/fonts/Poppins-Regular.ttf")
    });
  };
  const [dataLoaded, setDataLoaded] = useState(false);
  if (!dataLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setDataLoaded(true)}
      />
    );
  }
  return <Router />;
}
