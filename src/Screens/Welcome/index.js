import { useContext, useEffect, useRef, useState } from "react";
import { Animated, StyleSheet, Text, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AppContext } from "../../Providers/AppProvider";

export default function Welcome({ navigation }) {
  const fadeAnim = useRef(new Animated.Value(0)).current; // Initial value for opacity: 0
  const {
    isTheFirst,
    setTheFirst,
    setAppLang,
    setTempUnit,
    setFollowedCities,
  } = useContext(AppContext);

  useEffect(() => {
    const getAppInfo = async () => {
      try {
        const weatherAppInfoString = await AsyncStorage.getItem("@weatherApp");
        const weatherAppInfo = JSON.parse(weatherAppInfoString);
        console.log("weatherAppInfo: ", weatherAppInfo);

        if (weatherAppInfo) {
          setTheFirst(false);
          const { lang, unit, followedCities } = weatherAppInfo;
          setAppLang(lang);
          setTempUnit(unit);
          setFollowedCities(followedCities);
          setTimeout(() => {
            navigation.navigate("Main");
          }, 1100);
        } else {
          setTheFirst(true);
          setTimeout(() => {
            navigation.navigate("Setting");
          }, 1100);
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    getAppInfo();
  }, []);

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  return (
    <Animated.View style={[styles.container]}>
      <Text style={styles.content}>TODAY'S WEATHER</Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  content: {
    fontSize: 64,
    fontWeight: "bold",
  },
});
