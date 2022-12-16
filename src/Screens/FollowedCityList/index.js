import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { useContext } from "react";
import { StyleSheet } from "react-native";
import { View } from "react-native";
import { HeaderBar } from "../../Components/HeaderBar";
import { langs } from "../../constant";
import { AppContext } from "../../Providers/AppProvider";
import WidgetList from "./WidgetList";

export default function FollowedCityList() {
  const navigation = useNavigation();
  const { appLang } = useContext(AppContext);

  const handleSetting = () => {
    navigation.navigate("Setting");
  };
  return (
    <LinearGradient
      colors={["#2E335A", "#1C1B33"]}
      start={[0, 0]}
      end={[Math.abs(Math.cos(168.44 / 180)), Math.abs(Math.sin(168.44 / 180))]}
      style={styles.container}
    >
      <View style={styles.headerBar}>
        <HeaderBar title={langs[appLang].followedCities} />
      </View>
      <WidgetList />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 28,
  },
  headerBar: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    width: "100%",
    marginVertical: 20,
  },
  footer: {
    bottom: 0,
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
