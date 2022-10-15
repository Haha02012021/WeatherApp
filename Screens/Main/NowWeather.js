import { StyleSheet } from "react-native";
import { Dimensions } from "react-native";
import { Text } from "react-native";
import { View } from "react-native";

const screenWidth = Dimensions.get("window").width;

export default function NowWeather({ nowWeather }) {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={[styles.text, styles.place]}>{nowWeather.place}</Text>
        <Text style={[styles.text, styles.nowTemp]}>{nowWeather.temp}°</Text>
        <Text style={[styles.text, styles.weatherStatus]}>
          {nowWeather.weather_status}
        </Text>
        <View style={styles.tempLimit}>
          <Text style={styles.text}>H: {nowWeather.max_temp}°</Text>
          <Text style={styles.text}>L: {nowWeather.min_temp}°</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    width: "50%",
    top: "10%",
    left: screenWidth / 4,
  },
  content: {
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
    width: "60%",
    justifyContent: "space-between",
  },
});
