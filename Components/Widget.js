import { Image } from "react-native";
import { Text } from "react-native";
import { TouchableOpacity } from "react-native";
import { Dimensions } from "react-native";
import { StyleSheet } from "react-native";
import { View } from "react-native";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

export default function Widget({ weatherInfo }) {
  return (
    <TouchableOpacity>
      <View style={{ marginBottom: "8%" }}>
        <Image
          source={require("../assets/WidgetDeco.png")}
          resizeMode="stretch"
          style={{
            width: SCREEN_WIDTH - 20 * 2 - 4,
            height: (400 / 342) * 184,
          }}
        />
        <Image
          source={require("../assets/weather_icons/moon/2.png")}
          resizeMode="contain"
          style={styles.weatherIcon}
        />
        <Text style={styles.degree}>{weatherInfo.degree}°</Text>
        <View style={styles.bottom}>
          <Text style={styles.degreeLimit}>
            H: {weatherInfo.maxDegree}° L: {weatherInfo.minDegree}°
          </Text>
          <Text style={styles.city}>{weatherInfo.city}</Text>
        </View>
        <Text style={styles.weatherStatus}>{weatherInfo.weather_status}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  weatherIcon: {
    width: 160,
    height: 160,
    position: "absolute",
    top: -20,
    right: 4,
  },
  degree: {
    position: "absolute",
    top: 20,
    left: 20,
    color: "white",
    fontSize: 64,
    letterSpacing: 0.374,
  },
  bottom: {
    flexDirection: "column",
    position: "absolute",
    bottom: 16,
    left: 20,
  },
  degreeLimit: {
    fontSize: 12,
    color: "rgba(0, 0, 0, 0.4)",
  },
  city: {
    fontSize: 16,
    color: "rgba(255, 255, 255, 0.8)",
  },
  weatherStatus: {
    position: "absolute",
    bottom: 16,
    right: 20,
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.8)",
    fontWeight: "thin",
  },
});
