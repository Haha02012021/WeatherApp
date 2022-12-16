import { Icon } from "@rneui/themed";
import { useContext } from "react";
import { View, Text, StyleSheet } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { langs } from "../../constant";
import { AppContext } from "../../Providers/AppProvider";
import { convertDateTime } from "../../utils/methods";

export default function Detail({ currentWeather }) {
  const { tempUnit, appLang } = useContext(AppContext);
  return (
    <ScrollView vertical={true}>
      <Row
        icon={{ name: "thermometer-1", type: "font-awesome" }}
        title={langs[appLang].feelsLike}
        value={currentWeather.temp + "°"}
      />
      <Row
        icon={{ name: "water", type: "font-awesome-5" }}
        title={langs[appLang].humidity}
        value={currentWeather.humidity + "%"}
      />
      <Row
        icon={{ name: "drop", type: "entypo" }}
        title={langs[appLang].rain}
        value={currentWeather.rain ? currentWeather.rain["1h"] + "mm" : 0}
      />
      <Row
        icon={{ name: "wind", type: "feather" }}
        title={langs[appLang].wind}
        value={
          currentWeather.wind_speed + (tempUnit === "metric" ? " m/s" : " m/h")
        }
      />
      <Row
        icon={{ name: "cloud", type: "feather" }}
        title={langs[appLang].cloud}
        value={currentWeather.clouds + "%"}
      />
      <Row
        icon={{ name: "sun", type: "feather" }}
        title={langs[appLang].uvi}
        value={currentWeather.uvi}
      />
      <Row
        icon={{ name: "sunrise", type: "feather" }}
        title={langs[appLang].sunrise}
        value={convertDateTime(currentWeather.sunrise).hour + "h"}
      />
      <Row
        icon={{ name: "sunset", type: "feather" }}
        title={langs[appLang].sunset}
        value={convertDateTime(currentWeather.sunset).hour + "h"}
      />
    </ScrollView>
  );
}

function Row({ icon, title, value }) {
  return (
    <View style={styles.row}>
      <View style={styles.leftRow}>
        <Icon
          color="white"
          style={styles.icon}
          size={28}
          name={icon.name}
          type={icon.type}
        />
        <Text style={styles.text}>{title}</Text>
      </View>
      <Text style={styles.text}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 16,
    paddingHorizontal: 4,
    color: "white",
  },
  icon: {
    width: 40,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 8,
    paddingVertical: 8,
  },
  leftRow: {
    flexDirection: "row",
    alignItems: "center",
  },
});
