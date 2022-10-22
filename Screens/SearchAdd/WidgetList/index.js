import { StyleSheet } from "react-native";
import { Dimensions } from "react-native";
import { ScrollView } from "react-native";
import Widget from "../../../Components/Widget";

const weatherOfCities = [
  {
    city: "Thái Bình",
    degree: 19,
    maxDegree: 20,
    minDegree: 19,
    weather_status: "Mưa vừa",
  },
  {
    city: "Hải Phòng",
    degree: 20,
    maxDegree: 20,
    minDegree: 19,
    weather_status: "Mưa to",
  },
  {
    city: "Hải Phòng",
    degree: 20,
    maxDegree: 20,
    minDegree: 19,
    weather_status: "Mưa to",
  },
  {
    city: "Hải Phòng",
    degree: 20,
    maxDegree: 20,
    minDegree: 19,
    weather_status: "Mưa to",
  },
  {
    city: "Hải Phòng",
    degree: 20,
    maxDegree: 20,
    minDegree: 19,
    weather_status: "Mưa to",
  },
  {
    city: "Hải Phòng",
    degree: 20,
    maxDegree: 20,
    minDegree: 19,
    weather_status: "Mưa to",
  },
  {
    city: "Hải Phòng",
    degree: 20,
    maxDegree: 20,
    minDegree: 19,
    weather_status: "Mưa to",
  },
];

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

export default function WidgetList() {
  return (
    <ScrollView
      contentContainerStyle={styles.widgetList}
      style={{ height: SCREEN_HEIGHT - 140 }}
    >
      {weatherOfCities.map((weatherOfCity, index) => {
        return <Widget key={index} weatherInfo={weatherOfCity} />;
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  widgetList: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
});
