import { StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { View } from "react-native";
import { Dimensions } from "react-native";
import { Text } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import TabBar from "./TabBar";
import { useCallback, useEffect } from "react";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");
const MAX_TRANSLATE_Y = -SCREEN_HEIGHT / 1.3;

export default function BottomSheet() {
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
      } else
        if (translateY.value < -SCREEN_HEIGHT / 8 + 100) {
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

  const rShortInfo = useAnimatedStyle(() => {
    return {
      display: "flex",
    }
  })
  return (
    <GestureDetector gesture={gesture}>
      <Animated.View style={[styles.container, rContainerStyle]}>
        <Animated.View style={[styles.shortInfo, rShortInfo]}>
          <Text>Info</Text>
        </Animated.View>
        <View style={styles.header}>
          <View style={styles.shape} />
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
        <View
          style={styles.light}
        ></View>
      </Animated.View>
    </GestureDetector>
  );
}

const styles = StyleSheet.create({
  container: {
    zIndex: 3,
    top: SCREEN_HEIGHT / 1.3,
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
});
