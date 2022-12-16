import { Icon } from "@rneui/themed";
import axios from "axios";
import { LinearGradient } from "expo-linear-gradient";
import { useContext, useEffect } from "react";
import { useState } from "react";
import { Dimensions } from "react-native";
import { TouchableOpacity } from "react-native";
import { Animated } from "react-native";
import { TextInput } from "react-native";
import { StyleSheet } from "react-native";
import { View } from "react-native";
import { HeaderBar } from "../../../Components/HeaderBar";
import SearchInput from "../../../Components/Svg/SearchInput";
import { langs } from "../../../constant";
import { AppContext } from "../../../Providers/AppProvider";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

export default function TopNav({ setCities }) {
  const { appLang } = useContext(AppContext);
  const [query, setQuery] = useState("");

  useEffect(() => {}, []);

  const getCitiesByKeyWord = async (keyword) => {
    const searchedCities = await axios
      .request({
        method: "GET",
        url: "https://city-by-api-ninjas.p.rapidapi.com/v1/city",
        params: { name: keyword, limit: "20" },
        headers: {
          "X-RapidAPI-Key":
            "f6475b0623mshb08149ae628c8a1p1de51bjsnb8bf8a56444e",
          "X-RapidAPI-Host": "city-by-api-ninjas.p.rapidapi.com",
        },
      })
      .then(function (response) {
        return response.data;
      })
      .catch(function (error) {
        console.error(error);
      });

    setCities(searchedCities?.map((city) => city.name));
  };

  const handleChangeText = async (text) => {
    setQuery(text);
    if (text.length > 2) {
      await getCitiesByKeyWord(text);
    }
  };

  return (
    <Animated.View style={styles.topNav}>
      <View style={styles.leftAccessory}>
        <HeaderBar title={langs[appLang].weather} />
      </View>
      <View style={{ marginLeft: 20, marginRight: 20, zIndex: 4 }}>
        <SearchInput width={SCREEN_WIDTH - 20 * 2}></SearchInput>
        <LinearGradient
          colors={["#2E335A", "#1C1B33"]}
          start={[0, 0]}
          end={[
            Math.abs(Math.cos(168.44 / 180)),
            Math.abs(Math.sin(168.44 / 180)),
          ]}
          style={{ position: "absolute" }}
        ></LinearGradient>
        <View style={styles.extra}>
          <Icon
            name="search"
            type="feather"
            color="rgba(235, 235, 245, 0.6)"
            style={{ paddingRight: 8 }}
            size={20}
          />
          <TextInput
            placeholder={langs[appLang].enterCity}
            placeholderTextColor="rgba(235, 235, 245, 0.6)"
            style={{
              width: SCREEN_WIDTH - 20 * 2 - 60,
              color: "rgba(235, 235, 245, 1)",
            }}
            value={query}
            onChangeText={handleChangeText}
          />
          <TouchableOpacity
            onPress={() => {
              setQuery("");
              setCities([]);
            }}
          >
            <Icon
              type="feather"
              name="x"
              color={"rgba(235, 235, 245, 0.6)"}
              size={16}
            />
          </TouchableOpacity>
        </View>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  topNav: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingTop: 28,
    marginTop: 20,
    zIndex: 1,
  },
  leftAccessory: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    width: SCREEN_WIDTH / 2,
  },
  rightAccessory: {
    flexDirection: "row",
    justifyContent: "flex-end",
    width: SCREEN_WIDTH / 2,
    right: 20,
  },
  extra: {
    flexDirection: "row",
    width: SCREEN_WIDTH - 20 * 2,
    position: "absolute",
    height: 52,
    borderRadius: 20,
    padding: 8,
    alignItems: "center",
  },
});
