import { LinearGradient } from "expo-linear-gradient";
import { ScrollView } from "react-native";
import { StyleSheet } from "react-native";
import TopNav from "./TopNav";
import WidgetList from "./WidgetList";

export default function SearchAdd() {
  return (
    <LinearGradient
      colors={["#2E335A", "#1C1B33"]}
      start={[0, 0]}
      end={[Math.abs(Math.cos(168.44 / 180)), Math.abs(Math.sin(168.44 / 180))]}
      style={styles.container}
    >
      <ScrollView scrollEnabled={false} nestedScrollEnabled={true}>
        <TopNav />
        <WidgetList />
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "black",
  },
});
