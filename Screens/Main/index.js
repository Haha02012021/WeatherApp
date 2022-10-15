import { useEffect } from "react";
import {
  Animated,
  BackHandler,
  Image,
  ImageBackground,
  StyleSheet,
  View,
} from "react-native";
import Content from "./Content";
import NowWeather from "./NowWeather";
import TabBar from "./TabBar";

const nowWeather = {
  place: "Hà Nội",
  temp: 19,
  temp_unit: "C",
  weather_status: "Trời quang",
  max_temp: 24,
  min_temp: 19,
}

export default function Main({ navigation }) {
  useEffect(() => {
    navigation.addListener("beforeRemove", (e) => {
      e.preventDefault();
    });
    BackHandler.addEventListener("hardwareBackPress", () => {
      BackHandler.exitApp();
    });

    return () => {
      BackHandler.removeEventListener("hardwareBackPress");
    };
  }, []);

  return (
    <Animated.View style={styles.container}>
      <ImageBackground
        source={require("../../assets/main-background.jpg")}
        resizeMode="cover"
        style={styles.imageBackground}
      >
        <NowWeather nowWeather={nowWeather} />
        <Image
          source={require("../../assets/House.png")}
          style={styles.image}
        />
        <TabBar />
        <Content />
      </ImageBackground>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    zIndex: -1,
    position: "relative",
  },
  imageBackground: {
    flex: 1,
    justifyContent: "center",
    position: "relative",
  },
  image: {
    width: "100%",
    zIndex: 2,
    position: "absolute",
    bottom: 200,
  },
});
