import { useNavigation } from "@react-navigation/native";
import { Icon } from "@rneui/themed";
import { LinearGradient } from "expo-linear-gradient";
import { TouchableOpacity } from "react-native";
import { StyleSheet } from "react-native";
import { View } from "react-native";

export default function FollowedCityList() {
  const navigation = useNavigation();

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
      <View style={styles.footer}>
        <TouchableOpacity onPress={handleSetting}>
          <Icon name="settings" type="feather" color="white" size={40} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Icon name="bell" type="feather" color="white" size={40} />
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  footer: {
    bottom: 0,
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
