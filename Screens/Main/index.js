import { useEffect, useRef } from "react";
import { BackHandler, Image, ImageBackground, StyleSheet } from "react-native";
import BottomSheet from "./BottomSheet";
import NowWeather from "./NowWeather";
import TabBar from "./TabBar";
// import BottomSheet from "reanimated-bottom-sheet";
// import { Animated } from "react-native";
import { View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Dimensions } from "react-native";

const nowWeather = {
  place: "Hà Nội",
  temp: 19,
  temp_unit: "C",
  weather_status: "Trời quang",
  max_temp: 24,
  min_temp: 19,
};

const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get("window");

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
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={styles.container}>
        <ImageBackground
          source={require("../../assets/main-background.jpg")}
          resizeMode="cover"
          style={styles.imageBackground}
        >
          <View style={styles.content}>
            <NowWeather nowWeather={nowWeather} />
            <Image
              source={require("../../assets/House.png")}
              resizeMode="cover"
              style={styles.image}
            />
          </View>
        </ImageBackground>
      </View>
      <BottomSheet nowWeather={nowWeather} />
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  imageBackground: {
    flex: 1,
    justifyContent: "flex-start",
    width: SCREEN_WIDTH,
    height: "100%",
  },
  image: {
    width: SCREEN_WIDTH,
    zIndex: 2,
    bottom: -32,
  },
  content: {
    top: "8%",
  },
});
