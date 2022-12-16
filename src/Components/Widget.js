import { Image } from "react-native";
import { Text } from "react-native";
import { TouchableOpacity } from "react-native";
import { Dimensions } from "react-native";
import { StyleSheet } from "react-native";
import { View } from "react-native";
import { weatherIcons } from "../assets/weather_icons";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

export default function Widget({ weatherInfo }) {
  return (
    <View style={{ marginVertical: "4%", zIndex: 0 }}>
      <Image
        source={require("../assets/WidgetDeco.png")}
        resizeMode="stretch"
        style={{
          width: SCREEN_WIDTH - 20 * 2 - 4,
          height: (400 / 342) * 184,
        }}
      />
      <Image
        source={weatherIcons[weatherInfo.current.weather[0].icon]}
        resizeMode="contain"
        style={styles.weatherIcon}
      />
      <Text style={styles.degree}>{Math.round(weatherInfo.current.temp)}°</Text>
      <View style={styles.bottom}>
        <Text style={styles.degreeLimit}>
          H: {Math.round(weatherInfo.daily[0].temp.max)}° L:{" "}
          {Math.round(weatherInfo.daily[0].temp.min)}°
        </Text>
        <Text style={styles.city}>
          {weatherInfo.city.replace("Thành phố", "")}
        </Text>
      </View>
      <Text style={styles.weatherStatus}>
        {weatherInfo.current.weather[0].description
          .substring(0, 1)
          .toUpperCase() +
          weatherInfo.current.weather[0].description.substring(
            1,
            weatherInfo.current.weather[0].description.length
          )}
      </Text>
    </View>
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
    color: "rgba(255, 255, 255, 0.4)",
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
