import { useContext, useEffect, useRef, useState } from "react";
import { Animated, StyleSheet, Text, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AppContext } from "../../Providers/AppProvider";

export default function Welcome({ navigation }) {
  const fadeAnim = useRef(new Animated.Value(0)).current; // Initial value for opacity: 0
  const {
    setTheFirst,
    setAppLang,
    setTempUnit,
    setFollowedCities,
    setDarkTheme,
  } = useContext(AppContext);

  useEffect(() => {
    const now = new Date().getHours();
    if (now > 6 && now < 18) {
      setDarkTheme(1);
    } else {
      setDarkTheme(0);
    }
    const getAppInfo = async () => {
      try {
        const weatherAppInfoString = await AsyncStorage.getItem("@weatherApp");
        const weatherAppInfo = JSON.parse(weatherAppInfoString);
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
