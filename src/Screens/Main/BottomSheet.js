import { StyleSheet, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { View } from "react-native";
import { Dimensions } from "react-native";
import { Text } from "react-native";
import {
  Gesture,
  GestureDetector,
  ScrollView,
} from "react-native-gesture-handler";
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { useCallback, useEffect } from "react";
import Card from "../../Components/Card";
import TabBar from "./TabBar";
import { Image } from "react-native";
import { useContext } from "react";
import { AppContext } from "../../Providers/AppProvider";
import { useState } from "react";
import Accordion from "react-native-collapsible/Accordion";
import WeeklyForcast from "../../Components/WeeklyForcast";
import { weatherIcons } from "../../assets/weather_icons";
import { aqi, colors, langs } from "../../constant";
import { convertDateTime, determineAirQuality } from "../../utils/methods";
import { Slider } from "@rneui/themed";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");
const MAX_TRANSLATE_Y = -SCREEN_HEIGHT / 1.3;

export default function BottomSheet({ nowWeather }) {
  const { appLang, tempUnit, darkTheme } = useContext(AppContext);
  const [isHourlyForecast, setHourlyForeCast] = useState(true);
  const [selectedHourly, setSelectedHourly] = useState(0);
  const translateY = useSharedValue(0);
  const context = useSharedValue({ y: 0 });

  const scrollTo = useCallback((destination) => {
    "worklet";
    translateY.value = withSpring(destination, { damping: 50 });
  }, []);
  const gesture = Gesture.Pan()
    .onStart(() => {
      context.value = { y: translateY.value };
    })
    .onUpdate((event) => {
      translateY.value = event.translationY + context.value.y;
      translateY.value = Math.max(translateY.value, MAX_TRANSLATE_Y);
    })
    .onEnd(() => {
      if (translateY.value > -SCREEN_HEIGHT / 8 - 100) {
        scrollTo(-SCREEN_HEIGHT / 8);
      } else if (translateY.value < -SCREEN_HEIGHT / 8 + 100) {
        scrollTo(MAX_TRANSLATE_Y);
      }
    });

  useEffect(() => {
    scrollTo(-SCREEN_HEIGHT / 8);
  }, []);

  const rContainerStyle = useAnimatedStyle(() => {
    const borderRadius = interpolate(
      translateY.value,
      [MAX_TRANSLATE_Y + 50, MAX_TRANSLATE_Y],
      [25, 5],
      Extrapolate.CLAMP
    );
    return {
      borderRadius,
      transform: [{ translateY: translateY.value }],
    };
  });

  const rWidetStyle = useAnimatedStyle(() => {
    const marginTop = interpolate(
      translateY.value,
      [MAX_TRANSLATE_Y + SCREEN_HEIGHT, MAX_TRANSLATE_Y],
      [240, 40],
      Extrapolate.CLAMP
    );
    return {
      marginTop,
    };
  });

  const rTabBarStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      translateY.value,
      [MAX_TRANSLATE_Y + SCREEN_HEIGHT / 2, MAX_TRANSLATE_Y],
      [1, 0],
      Extrapolate.CLAMP
    );

    return {
      opacity,
    };
  });

  const handleHourly = (index) => {
    setSelectedHourly(index);
  };

  return (
    <GestureDetector gesture={gesture}>
      <>
        <Animated.View
          style={[
            styles.container,
            rContainerStyle,
            { backgroundColor: colors[darkTheme].gradient[0] },
          ]}
        >
          <Animated.View style={[styles.nowWeather]}>
            <Text style={{ fontSize: 34, color: "rgba(255, 255, 255, 0.7)" }}>
              {nowWeather.city}
            </Text>
            <Text style={{ fontSize: 20, color: "rgba(255, 255, 255, 0.4)" }}>
              {nowWeather.temp}|{nowWeather.current.weather[0].description}
            </Text>
          </Animated.View>
          <View style={styles.header}>
            <View style={styles.shape} />
            <LinearGradient
              colors={[
                "rgba(255, 255, 255, 0)",
                "rgba(255, 255, 255, 0.4)",
                "rgba(255, 255, 255, 0)",
              ]}
              start={[0.5, 0.8]}
              end={[0.8, 0.5]}
              style={[styles.top]}
            ></LinearGradient>
            <LinearGradient
              colors={[
                "rgba(255, 255, 255, 0)",
                "rgba(255, 255, 255, 0.4)",
                "rgba(255, 255, 255, 0)",
              ]}
              start={[0.1, 0.6]}
              end={[0.6, 0.2]}
              style={[styles.bottom]}
            ></LinearGradient>
            <View style={styles.headerActions}>
              <TouchableOpacity onPress={() => setHourlyForeCast(true)}>
                <Text style={styles.actionText}>{langs[appLang].hourly}</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setHourlyForeCast(false)}>
                <Text style={styles.actionText}>{langs[appLang].daily}</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.light}></View>
          {isHourlyForecast ? (
            <View style={[styles.content]}>
              <View style={styles.hourlyList}>
                <ScrollView
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
                >
                  {nowWeather.hourly.map((hourly, index) => {
                    return (
                      <TouchableOpacity
                        key={index}
                        onPress={() => handleHourly(index)}
                      >
                        <View
                          style={[
                            styles.hourly,
                            selectedHourly === index && {
                              backgroundColor: colors[darkTheme].color,
                              ...styles.activeHourly,
                            },
                          ]}
                        >
                          <Text style={[styles.hourlyText, styles.hour]}>
                            {convertDateTime(hourly.dt).hour}:00
                          </Text>
                          <View>
                            <Image
                              source={weatherIcons[hourly.weather[0].icon]}
                              resizeMode="contain"
                              style={{
                                height: 32,
                              }}
                            />
                          </View>
                          <Text style={[styles.hourlyText, styles.degree]}>
                            {Math.round(hourly.temp)}°
                          </Text>
                        </View>
                      </TouchableOpacity>
                    );
                  })}
                </ScrollView>
              </View>
              <ScrollView>
                <Animated.View style={[styles.widget, rWidetStyle]}>
                  {nowWeather.aqi && (
                    <View>
                      <Text style={styles.aqiText}>
                        AQI {nowWeather.aqi} -{" "}
                        {langs[appLang][determineAirQuality(nowWeather.aqi)]}
                      </Text>
                      <LinearGradient
                        start={[0, 0]}
                        end={[1, 0]}
                        locations={[0.1, 0.2, 0.3, 0.4, 0.6, 1]}
                        colors={[
                          aqi.good.color,
                          aqi.medium.color,
                          aqi.least.color,
                          aqi.bad.color,
                          aqi.damnable.color,
                          aqi.dangerous.color,
                        ]}
                        style={styles.linearGradientSlider}
                      >
                        <Slider
                          minimumTrackTintColor={"transparent"}
                          maximumTrackTintColor={"transparent"}
                          minimumValue={0}
                          maximumValue={500}
                          thumbStyle={styles.brightThumb}
                          trackStyle={{ height: 15 }}
                          value={nowWeather.aqi}
                          disabled={true}
                        />
                      </LinearGradient>
                    </View>
                  )}
                  <Card
                    iconName={"sun"}
                    cardName={langs[appLang].uvi}
                    value={
                      selectedHourly === 0
                        ? nowWeather.current.uvi
                        : nowWeather.hourly[selectedHourly].uvi
                    }
                    note="Vừa phải"
                  />
                  <Card
                    iconName={"sunrise"}
                    cardName={langs[appLang].sunrise}
                    value={
                      convertDateTime(
                        nowWeather.current.sunrise,
                        nowWeather.timezone
                      ).hour +
                      ":" +
                      convertDateTime(
                        nowWeather.current.sunrise,
                        nowWeather.timezone
                      ).minute
                    }
                    smallNote={
                      <Text
                        style={{
                          color: "white",
                          fontSize: 12,
                          opacity: 0.7,
                        }}
                      >
                        {langs[appLang].sunset}:{" "}
                        {
                          convertDateTime(
                            nowWeather.current.sunset,
                            nowWeather.timezone
                          ).hour
                        }
                        :
                        {
                          convertDateTime(
                            nowWeather.current.sunset,
                            nowWeather.timezone
                          ).minute
                        }
                      </Text>
                    }
                  />
                  <Card
                    iconName={"wind"}
                    cardName={langs[appLang].wind}
                    value={
                      (selectedHourly === 0
                        ? nowWeather.current.wind_speed
                        : nowWeather.hourly[selectedHourly].wind_speed) +
                      (tempUnit === "metric" ? " m/s" : " m/h")
                    }
                  />
                  <Card
                    iconName={"drop"}
                    iconType={"entypo"}
                    cardName={langs[appLang].rain}
                    value={
                      nowWeather.hourly[selectedHourly].rain
                        ? `${nowWeather.hourly[selectedHourly].rain["1h"]} mm`
                        : "0 mm"
                    }
                    note={langs[appLang].lastHour}
                    smallNote={
                      <Text
                        style={{
                          color: "white",
                          fontSize: 12,
                          opacity: 0.7,
                        }}
                      >
                        {langs[appLang].forecast}{" "}
                        {nowWeather.hourly[selectedHourly + 1]?.rain
                          ? nowWeather.hourly[selectedHourly + 1].rain["1h"]
                          : 0}{" "}
                        mm {langs[appLang].nextHour}.
                      </Text>
                    }
                  />
                  <Card
                    iconName={"thermometer-1"}
                    iconType={"font-awesome"}
                    cardName={langs[appLang].feelsLike}
                    value={
                      (selectedHourly === 0
                        ? Math.round(nowWeather.current.feels_like)
                        : Math.round(
                            nowWeather.hourly[selectedHourly].feels_like
                          )) + "°"
                    }
                    smallNote={
                      <Text
                        style={{
                          color: "white",
                          fontSize: 12,
                          opacity: 0.7,
                        }}
                      >
                        Giống nhiệt độ thực tế.
                      </Text>
                    }
                  />
                  <Card
                    iconName={"water"}
                    iconType={"font-awesome-5"}
                    cardName={langs[appLang].humidity}
                    value={
                      (selectedHourly === 0
                        ? nowWeather.current.humidity
                        : nowWeather.hourly[selectedHourly].humidity) + "%"
                    }
                    smallNote={
                      <Text
                        style={{
                          color: "white",
                          fontSize: 12,
                          opacity: 0.7,
                        }}
                      >
                        {langs[appLang].dewPoint}{" "}
                        {selectedHourly === 0
                          ? nowWeather.current.dew_point
                          : nowWeather.hourly[selectedHourly].dew_point}
                        .
                      </Text>
                    }
                  />
                </Animated.View>
              </ScrollView>
            </View>
          ) : (
            <WeeklyForcast daily={nowWeather.daily} />
          )}
        </Animated.View>
        <Animated.View style={[styles.tabBar, rTabBarStyle]}>
          <TabBar />
        </Animated.View>
      </>
    </GestureDetector>
  );
}

const styles = StyleSheet.create({
  container: {
    zIndex: 3,
    top: SCREEN_HEIGHT / 1.25,
    position: "absolute",
    borderTopWidth: 1,
    borderLeftWidth: 0.5,
    borderRightWidth: 0.5,
    borderColor: "rgba(255, 255, 255, 0.5)",
    height: "100%",
    width: SCREEN_WIDTH,
    borderRadius: 44,
    opacity: 0.95,
  },
  nowWeather: {
    top: -124,
    backgroundColor: "#2E335A",
    opacity: 0.95,
    padding: 8,
    flexDirection: "column",
    alignItems: "center",
    display: "none",
  },
  linearGradient: {
    position: "absolute",
    height: SCREEN_HEIGHT,
    width: SCREEN_WIDTH,
    borderRadius: 44,
  },
  shortInfo: {
    height: 64,
    display: "none",
  },
  header: {
    height: 48,
    position: "absolute",
    top: 0,
    zIndex: 2,
  },
  top: {
    width: SCREEN_WIDTH / 2,
    left: SCREEN_WIDTH / 4,
    top: -5.5,
    height: 2.5,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 44,
  },
  bottom: {
    width: SCREEN_WIDTH,
    top: 48,
    height: 2.5,
    shadowColor: "rgba(0, 0, 0, 1)",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255, 255, 255, 0.2)",
  },
  light: {
    top: -48,
    left: SCREEN_WIDTH / 2 - SCREEN_WIDTH / 4,
    backgroundColor: "transparent",
    height: 48,
    zIndex: 1,
    width: SCREEN_WIDTH / 2,
    borderRadius: SCREEN_WIDTH / 2,
    transform: [{ scaleX: 1.5 }],
    shadowColor: "rgba(196, 39, 251, 0.5)",
    shadowOffset: {
      width: SCREEN_WIDTH,
      height: 40,
    },
    shadowRadius: 16,
    elevation: 24,
  },
  shape: {
    height: 4,
    width: 48,
    borderRadius: 10,
    top: 9,
    left: SCREEN_WIDTH / 2 - 48 / 2,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    zIndex: 2,
  },

  headerActions: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "flex-end",
    height: "100%",
  },
  actionText: {
    color: "rgba(235, 235, 245, 0.6)",
    fontSize: 15,
    fontWeight: "600",
    marginBottom: 8,
    letterSpacing: -0.5,
  },

  hourlyList: {
    top: 32,
    left: 20,
    right: 20,
    width: SCREEN_WIDTH - 26 * 2,
  },
  hourly: {
    height: 146,
    width: 60,
    backgroundColor: "rgba(72, 49, 157, 0.1)",
    borderWidth: 2,
    borderRadius: 30,
    borderColor: "rgba(0, 0, 0, 0.2)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly",
    alignItems: "center",
    marginLeft: 6,
    marginRight: 6,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,

    elevation: 10,
    marginBottom: 10,
  },
  activeHourly: {
    height: 146,
    width: 60,
    borderWidth: 1,
    borderRadius: 30,
    borderColor: "rgba(255, 255, 255, 0.5)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly",
    alignItems: "center",
    marginLeft: 6,
    marginRight: 6,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,

    elevation: 10,
  },
  hourlyText: {
    color: "white",
  },
  hour: {
    fontSize: 15,
    fontWeight: "600",
    lineHeight: 20,
    letterSpacing: -0.5,
  },
  degree: {
    fontSize: 20,
    fontWeight: "400",
    letterSpacing: 0.38,
    lineHeight: 24,
  },
  widget: {
    marginLeft: 26,
    flexDirection: "row",
    flexWrap: "wrap",
  },
  tabBar: {
    position: "absolute",
    width: SCREEN_WIDTH,
    bottom: 0,
    zIndex: 4,
  },

  linearGradientSlider: {
    borderRadius: 20,
    height: 8,
    justifyContent: "center",
    marginBottom: 16,
    width: SCREEN_WIDTH - 2 * 36,
  },
  brightThumb: {
    backgroundColor: "white",
    borderColor: "grey",
    borderRadius: 10,
    borderWidth: 4,
    height: 16,
    width: 16,
  },
  aqiText: {
    color: "rgba(255, 255, 255, 0.8)",
    marginBottom: 8,
  },
});
