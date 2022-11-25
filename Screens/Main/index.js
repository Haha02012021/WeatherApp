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
import { useContext } from "react";
import { AppContext } from "../../Providers/AppProvider";

// const nowWeathers = [
//   {
//     place: "Hà Nội",
//     temp: 19,
//     temp_unit: "C",
//     weather_status: "Trời quang",
//     max_temp: 24,
//     min_temp: 19,
//   },
//   {
//     place: "Thái Bình",
//     temp: 20,
//     temp_unit: "C",
//     weather_status: "Trời quang",
//     max_temp: 23,
//     min_temp: 20,
//   },
//   {
//     place: "Đà Lạt",
//     temp: 20,
//     temp_unit: "C",
//     weather_status: "Trời quang",
//     max_temp: 23,
//     min_temp: 20,
//   },
// ];

const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get("window");

export default function Main({ navigation }) {
  const { appLang, tempUnit, followedCities } = useContext(AppContext);
  const [touchX, setTouchX] = useState();
  const [followedWeathers, setFollowedWeathers] = useState([]);
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

    if (followedCities.length >= followedWeathers.length)
      setFollowedWeathers([]);
    followedCities.forEach((followedCity) => {
      getWeather(followedCity);
    });

    return () => {
      navigation.removeListener("beforeRemove");
      backHandler.remove();
    };
  }, [navigation, tempUnit, appLang]);

  const getWeather = async (cityName) => {
    const city = await fetch(
      `https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=&appid=acbae9c57a24663635f3918fd4e8f0c7`
    )
      .then((response) => response.json())
      .then((data) => data);

    const weather = await fetch(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${city[0].lat}&lon=${city[0].lon}&exclude=&appid=acbae9c57a24663635f3918fd4e8f0c7&lang=${appLang}&units=${tempUnit}`
    )
      .then((response) => response.json())
      .then((data) => data);
    // console.log(weather);
    setFollowedWeathers((prev) => [
      ...prev,
      {
        city: city[0].local_names[appLang],
        current: weather.current,
        hourly: weather.hourly,
        daily: weather.daily,
      },
    ]);
  };

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
            if (weatherIndex < followedWeathers.length - 1) {
              setWeatherIndex(weatherIndex + 1);
            } else {
              setWeatherIndex(0);
            }
          }

          if (touchX - e.nativeEvent.pageX < -20) {
            if (weatherIndex > 0) {
              setWeatherIndex(weatherIndex - 1);
            } else {
              setWeatherIndex(followedWeathers.length - 1);
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
            {followedWeathers.length > 0 &&
              followedWeathers.map((nowWeather, index) => {
                return (
                  <TouchableOpacity
                    key={index}
                    onPress={() => handleSwipeOther(index)}
                    style={{ padding: 8 }}
                  >
                    {index === weatherIndex ? (
                      <Icon
                        name="circle"
                        type="font-awesome"
                        color="white"
                        size={6}
                      />
                    ) : (
                      <Icon
                        name="circle-thin"
                        type="font-awesome"
                        color="white"
                        size={6}
                      />
                    )}
                  </TouchableOpacity>
                );
              })}
          </View>
          <View style={styles.content}>
            {followedWeathers.length > 0 && (
              <NowWeather nowWeather={followedWeathers[weatherIndex]} />
            )}
            <Image
              source={require("../../assets/House.png")}
              resizeMode="cover"
              style={styles.image}
            />
          </View>
        </ImageBackground>
      </View>
      {followedWeathers.length > 0 && (
        <BottomSheet nowWeather={followedWeathers[weatherIndex]} />
      )}
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
