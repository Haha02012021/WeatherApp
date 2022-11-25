import { StyleSheet } from "react-native";
import { Dimensions } from "react-native";
import { Text } from "react-native";
import { View } from "react-native";

const screenWidth = Dimensions.get("window").width;

export default function NowWeather({ nowWeather }) {
  return (
    <View style={styles.container}>
      <Text style={[styles.text, styles.place]}>{nowWeather.city}</Text>
      <Text style={[styles.text, styles.nowTemp]}>
        {Math.round(nowWeather.current.temp)}°
      </Text>
      <Text style={[styles.text, styles.weatherStatus]}>
        {nowWeather.current.weather[0].description.charAt(0).toUpperCase() +
          nowWeather.current.weather[0].description.slice(1)}
      </Text>
      <View style={styles.tempLimit}>
        <Text style={styles.text}>
          H: {Math.round(nowWeather.daily[0].temp.max)}°
        </Text>
        <Text style={styles.text}>
          L: {Math.round(nowWeather.daily[0].temp.min)}°
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "white",
    fontSize: 20,
    padding: 0,
    margin: 0,
  },
  place: {
    fontSize: 34,
  },
  nowTemp: {
    fontSize: 96,
  },
  weatherStatus: {
    color: "rgba(235, 235, 245, 0.6)",
  },
  tempLimit: {
    display: "flex",
    flexDirection: "row",
    width: "40%",
    justifyContent: "space-between",
  },
});
