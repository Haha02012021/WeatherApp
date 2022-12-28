import { Icon } from "@rneui/themed";
import { LinearGradient } from "expo-linear-gradient";
import { useContext } from "react";
import { useState } from "react";
import { View } from "react-native";
import { Text } from "react-native";
import { TouchableOpacity } from "react-native";
import { ScrollView } from "react-native";
import { StyleSheet } from "react-native";
import { colors } from "../../constant";
import { AppContext } from "../../Providers/AppProvider";
import TopNav from "./TopNav";

export default function SearchAdd({ navigation }) {
  const { darkTheme } = useContext(AppContext);
  const [cities, setCities] = useState([]);

  const handleChooseCity = (city) => {
    navigation.navigate("CityWeather", {
      city: city.toLowerCase(),
    });
  };

  return (
    <LinearGradient
      colors={colors[darkTheme].gradient}
      start={[0, 0]}
      end={[Math.abs(Math.cos(168.44 / 180)), Math.abs(Math.sin(168.44 / 180))]}
      style={styles.container}
    >
      <TopNav setCities={(cities) => setCities(cities)} />

      <ScrollView
        style={{ zIndex: 0 }}
        scrollEnabled={true}
        nestedScrollEnabled={true}
      >
        {cities?.map((city, index) => {
          return (
            <TouchableOpacity key={city} onPress={() => handleChooseCity(city)}>
              <View
                style={[
                  {
                    flexDirection: "row",
                    paddingHorizontal: 20,
                    paddingVertical: 8,
                    alignItems: "center",
                  },
                  index !== 0 && {
                    borderTopWidth: 1,
                    borderTopColor: "rgba(235, 235, 245, 0.4)",
                  },
                ]}
              >
                <Icon name="place" color="rgba(235, 235, 245, 1)" />
                <Text
                  style={{
                    color: "rgba(235, 235, 245, 1)",
                    paddingLeft: 8,
                    fontSize: 20,
                  }}
                >
                  {city}
                </Text>
              </View>
            </TouchableOpacity>
          );
        })}
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
