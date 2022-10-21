import { StyleSheet } from "react-native";
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

const hourlys = [
  {
    hour: "12 AM",
    degree: "19",
    degree_unit: "C",
  },
  {
    hour: "1 AM",
    degree: "19",
    degree_unit: "C",
  },
  {
    hour: "1 AM",
    degree: "19",
    degree_unit: "C",
  },
  {
    hour: "1 AM",
    degree: "19",
    degree_unit: "C",
  },
  {
    hour: "1 AM",
    degree: "19",
    degree_unit: "C",
  },
  {
    hour: "1 AM",
    degree: "19",
    degree_unit: "C",
  },
  {
    hour: "1 AM",
    degree: "19",
    degree_unit: "C",
  },
  {
    hour: "1 AM",
    degree: "19",
    degree_unit: "C",
  },
];

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");
const MAX_TRANSLATE_Y = -SCREEN_HEIGHT / 1.3;

export default function BottomSheet({ nowWeather }) {
  const translateY = useSharedValue(0);
  const context = useSharedValue({ y: 0 });

  const scrollTo = useCallback((destination) => {
    "worklet";
    translateY.value = withSpring(destination, { damping: 50 });
  }, []);
  const gesture = Gesture.Pan()
    .onStart(() => {
      // console.log("start");
      context.value = { y: translateY.value };
    })
    .onUpdate((event) => {
      // console.log("update");
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
      [MAX_TRANSLATE_Y + SCREEN_HEIGHT, MAX_TRANSLATE_Y],
      [1, 0],
      Extrapolate.CLAMP
    );

    return {
      opacity,
    };
  });

  return (
    <GestureDetector gesture={gesture}>
      <>
        <Animated.View style={[styles.container, rContainerStyle]}>
          <Animated.View style={[styles.nowWeather]}>
            <Text style={{ fontSize: 34, color: "rgba(255, 255, 255, 0.7)" }}>
              {nowWeather.place}
            </Text>
            <Text style={{ fontSize: 20, color: "rgba(255, 255, 255, 0.4)" }}>
              {nowWeather.temp}|{nowWeather.weather_status}
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
              <Text style={styles.actionText}>Dự báo trong ngày</Text>
              <Text style={styles.actionText}>Dự báo trong tuần</Text>
            </View>
          </View>
          <View style={styles.light}></View>
          <View style={[styles.content]}>
            <View style={styles.hourlyList}>
              <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}
              >
                {hourlys.map((hourly, index) => {
                  return (
                    <View key={index} style={styles.hourly}>
                      <Text style={[styles.hourlyText, styles.hour]}>
                        {hourly.hour}
                      </Text>
                      <View>
                        <Text class={styles.hourlyText}></Text>
                      </View>
                      <Text style={[styles.hourlyText, styles.degree]}>
                        {hourly.degree}°
                      </Text>
                    </View>
                  );
                })}
              </ScrollView>
            </View>
            <ScrollView>
              <Animated.View style={[styles.widget, rWidetStyle]}>
                <Card
                  iconName={"sun"}
                  cardName="Mức độ tia UV"
                  value={4}
                  note="Vừa phải"
                />
                <Card
                  iconName={"sunrise"}
                  cardName="Mặt trời mọc"
                  value={"5:00 AM"}
                  smallNote={
                    <Text
                      style={{
                        color: "white",
                        fontSize: 12,
                        opacity: 0.7,
                      }}
                    >
                      Mặt trời lặn: 7:00 PM
                    </Text>
                  }
                />
                <Card iconName={"wind"} cardName="Gió" value={"9.7 km/h"} />
                <Card
                  iconName={"drop"}
                  iconType={"entypo"}
                  cardName="Lượng mưa"
                  value={"1.8 mm"}
                  note="vào giờ trước"
                  smallNote={
                    <Text
                      style={{
                        color: "white",
                        fontSize: 12,
                        opacity: 0.7,
                      }}
                    >
                      Dự đoán 1.2 mm trong 24 giờ tiếp theo.
                    </Text>
                  }
                />
                <Card
                  iconName={"thermometer-1"}
                  iconType={"font-awesome"}
                  cardName="Cảm giác như"
                  value="19°"
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
                  cardName="Độ ẩm"
                  value={"90%"}
                  smallNote={
                    <Text
                      style={{
                        color: "white",
                        fontSize: 12,
                        opacity: 0.7,
                      }}
                    >
                      Điểm sương bây giờ là 17.
                    </Text>
                  }
                />
              </Animated.View>
            </ScrollView>
          </View>
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
    backgroundColor: "#2E335A",
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
    backgroundColor: "rgba(0, 0, 0, 0.1)",
    borderWidth: 2,
    borderRadius: 30,
    borderColor: "rgba(0, 0, 0, 0.2)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly",
    alignItems: "center",
    marginLeft: 6,
    marginRight: 6,
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

  testContainer: {
    flex: 1,
    //paddingTop: StatusBar.currentHeight,
    height: 40,
  },
  testScrollView: {
    backgroundColor: "pink",
    marginHorizontal: 20,
  },
  testText: {
    fontSize: 42,
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
});
