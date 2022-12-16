import { StyleSheet } from "react-native";
import { Text } from "react-native";
import { View } from "react-native";

export default function Hourly({ hourlyInfo }) {
  return (
    <View class={[styles.hourly]}>
      <Text class={[styles.text, styles.hour]}>{hourlyInfo.hour}</Text>
      <View>
        <Text class={[styles.text]}></Text>
      </View>
      <Text class={[styles.text, styles.degree]}>{hourlyInfo.degree}°</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  hourly: {
    height: 146,
    width: 60,
    backgroundColor: "rgba(0, 0, 0, 0.2)",
    borderWidth: 2,
    borderColor: "black",
  },
  text: {
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
});
