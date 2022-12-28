import { useEffect, useRef } from "react";
import { BackHandler, Image, ImageBackground, StyleSheet } from "react-native";
import BottomSheet from "./BottomSheet";
import NowWeather from "./NowWeather";
import { View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Dimensions } from "react-native";
import { Icon } from "@rneui/themed";
import { useState } from "react";
import { TouchableOpacity } from "react-native";
import { useContext } from "react";
import { AppContext } from "../../Providers/AppProvider";
import { houses } from "../../assets/houses";
import { getWeatherBg } from "../../utils/methods";

const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get("window");
export default function Main({ route, navigation }) {
  const { appLang, tempUnit, followedCities } = useContext(AppContext);
  const [touchX, setTouchX] = useState();
  const [followedWeathers, setFollowedWeathers] = useState([]);
  const [weatherIndex, setWeatherIndex] = useState(route.params?.index || 0);
  const [defaultWeather, setDefaultWeather] = useState();

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

    if (followedWeathers.length >= followedCities.length)
      setFollowedWeathers([]);

    followedCities.forEach(async (followedCity, index) => {
      await getWeather(followedCity, index);
    });

    const getSearchedWeather = async () => {
      if (route.params?.index >= followedCities.length) {
        await getWeather(route.params?.searchedCity);
        navigation.setParams(undefined);
      }
    };

    getSearchedWeather();

    return () => {
      navigation.removeListener("beforeRemove");
      backHandler.remove();
      setFollowedWeathers([]);
    };
  }, [tempUnit, appLang, followedCities]);

  const getWeather = async (cityName, index) => {
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

    const aqi = await fetch(
      `https://api.waqi.info/feed/${cityName.replace(
        " ",
        ""
      )}/?token=e34b1c19f2e24f056f1cde5ab21fe2cbccd1dd5b`
    )
      .then((response) => response.json())
      .then((data) => data);

    setFollowedWeathers((prev) => [
      ...prev,
      {
        timezone: weather.timezone,
        city: city[0].local_names[appLang],
        current: weather.current,
        hourly: weather.hourly,
        daily: weather.daily,
        aqi: aqi.status === "ok" ? aqi.data.aqi : null,
      },
    ]);

    if (index === 0) {
      setDefaultWeather({
        timezone: weather.timezone,
        city: city[0].local_names[appLang],
        current: weather.current,
        hourly: weather.hourly,
        daily: weather.daily,
        aqi: aqi.status === "ok" ? aqi.data.aqi : null,
      });
    }
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
        {followedWeathers.length > weatherIndex && (
          <ImageBackground
            source={getWeatherBg(followedWeathers[weatherIndex].current)}
            resizeMode="cover"
            style={styles.imageBackground}
          >
            <View
              style={{
                top: 40,
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <View
                style={{
                  width: SCREEN_WIDTH / 3,
                  flex: 1,
                  justifyContent: "flex-start",
                  left: 0,
                }}
              >
                {weatherIndex >= followedCities.length && (
                  <TouchableOpacity>
                    <Icon type="feather" name="plus" color="white" />
                  </TouchableOpacity>
                )}
              </View>

              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  width: SCREEN_WIDTH / 3,
                }}
              >
                {followedWeathers.length > weatherIndex &&
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
              <View style={{ width: SCREEN_WIDTH / 3 }}></View>
            </View>
            <View style={styles.content}>
              {followedWeathers.length > weatherIndex && (
                <NowWeather nowWeather={followedWeathers[weatherIndex]} />
              )}
              <Image
                source={
                  followedWeathers[weatherIndex].current.weather[0].icon.match(
                    "n"
                  )
                    ? houses["n"]
                    : houses["d"]
                }
                resizeMode="contain"
                style={styles.image}
              />
            </View>
          </ImageBackground>
        )}
      </View>
      {followedWeathers.length > weatherIndex && (
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
