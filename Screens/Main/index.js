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
import { Icon } from "@rneui/themed";
import { useState } from "react";
import { TouchableOpacity } from "react-native";

const nowWeathers = [
  {
    place: "Hà Nội",
    temp: 19,
    temp_unit: "C",
    weather_status: "Trời quang",
    max_temp: 24,
    min_temp: 19,
  },
  {
    place: "Thái Bình",
    temp: 20,
    temp_unit: "C",
    weather_status: "Trời quang",
    max_temp: 23,
    min_temp: 20,
  },
  {
    place: "Đà Lạt",
    temp: 20,
    temp_unit: "C",
    weather_status: "Trời quang",
    max_temp: 23,
    min_temp: 20,
  },
];

const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get("window");

export default function Main({ navigation }) {
  const [touchX, setTouchX] = useState();
  const [weatherIndex, setWeatherIndex] = useState(0);
  useEffect(() => {
    navigation.addListener("beforeRemove", (e) => {
      e.preventDefault();
    });
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      () => {
        if (navigation.getState().index === 1) {
          BackHandler.exitApp();
          return true;
        }
        return false;
      }
    );

    return () => {
      navigation.removeListener("beforeRemove");
      backHandler.remove();
    };
  }, [navigation]);

  const handleSwipeOther = (index) => {
    setWeatherIndex(index);
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View
        style={styles.container}
        onTouchStart={(e) => setTouchX(e.nativeEvent.pageX)}
        onTouchEnd={(e) => {
          if (touchX - e.nativeEvent.pageX > 20) {
            if (weatherIndex < nowWeathers.length - 1) {
              setWeatherIndex(weatherIndex + 1);
            } else {
              setWeatherIndex(0);
            }
          }

          if (touchX - e.nativeEvent.pageX < -20) {
            if (weatherIndex > 0) {
              setWeatherIndex(weatherIndex - 1);
            } else {
              setWeatherIndex(nowWeathers.length - 1);
            }
          }
        }}
      >
        <ImageBackground
          source={require("../../assets/main-background.jpg")}
          resizeMode="cover"
          style={styles.imageBackground}
        >
          <View
            style={{
              top: 40,
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {nowWeathers.map((nowWeather, index) => {
              return (
                <TouchableOpacity
                  key={index}
                  onPress={() => handleSwipeOther(index)}
                  style={{ padding: 8 }}
                >
                  {index === weatherIndex ? (
                    <Icon name="dot-single" type="entypo" color="white" />
                  ) : (
                    <Icon name="circle" type="entypo" color="white" size={6} />
                  )}
                </TouchableOpacity>
              );
            })}
          </View>
          <View style={styles.content}>
            <NowWeather nowWeather={nowWeathers[weatherIndex]} />
            <Image
              source={require("../../assets/House.png")}
              resizeMode="cover"
              style={styles.image}
            />
          </View>
        </ImageBackground>
      </View>
      <BottomSheet nowWeather={nowWeathers[weatherIndex]} />
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
    position: "absolute",
    top: "8%",
  },
});
