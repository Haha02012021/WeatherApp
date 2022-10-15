import { StyleSheet } from "react-native";
import { Animated } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { View } from "react-native";
import { Dimensions } from "react-native";
import { Text } from "react-native";

const widthScreen = Dimensions.get("window").width;

export default function Content() {
  return (
    <LinearGradient
      colors={["#2E335A", "rgba(255, 255, 255, 0.25)", "#1C1B33"]}
      start={[0.0162, 0.9572]}
      style={styles.linearGradient}
    >
      <Animated.View style={styles.container}>
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
          // colors={["rgba(196, 39, 251, 0.5)", "rgba(255, 255, 255, 0)"]}
          // start={[0, 0.1]}
          style={styles.light}
        ></View>
      </Animated.View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  linearGradient: {
    borderTopWidth: 1,
    borderLeftWidth: 0.5,
    borderRightWidth: 0.5,
    borderColor: "rgba(255, 255, 255, 0.5)",
    borderRadius: 44,
    zIndex: 3,
    opacity: 0.95,
    top: "64%",
    minHeight: "100%",
    overflowY: "scroll",
    filter: "blur(8px)",
  },
  container: {
    position: "relative",
  },
  header: {
    height: 48,
    position: "absolute",
    top: 0,
    zIndex: 2,
  },
  bottom: {
    width: widthScreen,
    top: 48,
    height: 2.5,
    shadowColor: "rgba(0, 0, 0, 1)",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.20,
    shadowRadius: 1.41,
    
    elevation: 2,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255, 255, 255, 0.2)",
  },
  light: {
    top: - 48,
    left: widthScreen / 2 - widthScreen / 4,
    backgroundColor: "transparent",
    height: 48,
    zIndex: 1,
    width: widthScreen / 2,
    borderRadius: widthScreen / 2,
    transform: [{ scaleX: 1.5 }],
    shadowColor: "rgba(196, 39, 251, 0.5)",
    shadowOffset: {
      width: widthScreen,
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
    left: widthScreen / 2 - 48 / 2,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    zIndex: 2,
  },

  headerActions: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "flex-end",
    height: '100%',
  },
  actionText: {
    color: "rgba(235, 235, 245, 0.6)",
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 8,
    letterSpacing: -0.5,
  }
});
