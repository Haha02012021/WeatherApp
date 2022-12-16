import { useContext } from "react";
import { TouchableOpacity } from "react-native";
import { View, Text, StyleSheet, Dimensions, Image } from "react-native";
import { weatherIcons } from "../../assets/weather_icons";
import { langs } from "../../constant";
import { AppContext } from "../../Providers/AppProvider";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
export default function Header({ city, currentWeather, onClickForecastType }) {
  const { appLang } = useContext(AppContext);
  const formatText = (text) => {
    return text.substring(0, 1).toUpperCase() + text.substring(1, text.length);
  };
  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <Text style={styles.text}>{city.replace("Thành phố", "")}</Text>
        <Text style={styles.text}>{currentWeather.temp}°</Text>
      </View>
      <View style={styles.bottom}>
        <Image
          source={weatherIcons[currentWeather.weather[0].icon]}
          resizeMode="contain"
          style={styles.weatherIcon}
        />
        <Text style={[styles.text, styles.descrip]}>
          {formatText(currentWeather.weather[0].description)}
        </Text>
      </View>
      <View style={styles.tabs}>
        <TouchableOpacity onPress={() => onClickForecastType(0)}>
          <Text style={[styles.text, styles.tabText]}>
            {langs[appLang].hour}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => onClickForecastType(1)}>
          <Text style={[styles.text, styles.tabText]}>
            {langs[appLang].day}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 16,
  },
  top: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 24,
    maxWidth: SCREEN_WIDTH / 2,
    textAlign: "center",
    paddingHorizontal: 8,
    color: "white",
  },
  weatherIcon: {
    width: 40,
    height: 40,
  },
  bottom: {
    flexDirection: "row",
    justifyContent: "center",
  },
  descrip: {
    fontSize: 16,
  },
  tabs: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    paddingVertical: 8,
  },
  tabText: {
    fontSize: 18,
  },
});
