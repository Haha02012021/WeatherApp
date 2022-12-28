import AsyncStorage from "@react-native-async-storage/async-storage";
import { Button } from "@rneui/themed";
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import { useContext, useEffect } from "react";
import { Alert } from "react-native";
import { StyleSheet } from "react-native";
import { View } from "react-native";
import { Dimensions } from "react-native";
import { ScrollView } from "react-native";
import Accordion from "react-native-collapsible/Accordion";
import Widget from "../../../Components/Widget";
import { colors, langs } from "../../../constant";
import { AppContext } from "../../../Providers/AppProvider";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

export default function WidgetList() {
  const { appLang, tempUnit, followedCities, darkTheme, setFollowedCities } =
    useContext(AppContext);
  const [weatherOfCities, setWeatherOfCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState([]);

  useEffect(() => {
    if (weatherOfCities.length < followedCities.length) {
      followedCities.forEach(async (followedCity, index) => {
        await getWeather(followedCity, index);
      });
    }
  }, [followedCities]);

  const getWeather = async (cityName, index) => {
    const city = await fetch(
      `https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=&appid=acbae9c57a24663635f3918fd4e8f0c7`
    )
      .then((response) => response.json())
      .then((data) => data);

    const weather = await fetch(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${city[0].lat}&lon=${city[0].lon}&exclude=&appid=acbae9c57a24663635f3918fd4e8f0c7&lang=${appLang}&units=${tempUnit}`
    )
      .then((response) => response.json())
      .then((data) => data);

    setWeatherOfCities((prev) => [
      ...prev,
      {
        rawCity: cityName,
        city: city[0].local_names[appLang],
        current: weather.current,
        hourly: weather.hourly,
        daily: weather.daily,
        default: index,
      },
    ]);
  };

  const hanleChangeSection = (indexes) => {
    if (selectedCity.length === 1) {
      if (selectedCity[0] === indexes[0]) {
        setSelectedCity([]);
      } else {
        setSelectedCity(indexes);
      }
    } else {
      setSelectedCity(indexes);
    }
  };

  const renderHeader = (content, index, isActive, sections) => {
    return <Widget weatherInfo={sections[index]} />;
  };

  const renderContent = (content, index, isActive, sections) => {
    return (
      <View style={styles.actions}>
        <Button
          title={langs[appLang].unFollow}
          color="red"
          type="outline"
          buttonStyle={{
            borderColor: "rgba(255, 255, 255, 0.4)",
          }}
          titleStyle={{
            color: "rgba(255, 255, 255, 0.4)",
          }}
          onPress={() => handleUnFollow(index, sections[index])}
        />
        <Button
          title={
            sections[index].default === 0
              ? langs[appLang].default
              : langs[appLang].setDefault
          }
          ViewComponent={LinearGradient}
          linearGradientProps={{
            colors:
              sections[index].default === 0
                ? [colors[darkTheme].color, colors[darkTheme].color]
                : colors[darkTheme].gradient,
            start: { x: 0, y: 0.8 },
            end: { x: 1, y: 0.5 },
          }}
          onPress={() => handleSetDefault(index, sections[index].default)}
        />
      </View>
    );
  };

  const handleSetDefault = async (localIndex, appIndex) => {
    if (appIndex !== 0) {
      let newWeatherOfCities = weatherOfCities.map((weatherOfCity, index) => {
        if (index === localIndex) {
          return {
            ...weatherOfCity,
            default: 0,
          };
        }
        if (weatherOfCity.default === 0) {
          return {
            ...weatherOfCity,
            default: localIndex,
          };
        }
        return weatherOfCity;
      });
      setWeatherOfCities(newWeatherOfCities);
      let newFollowCities = [...followedCities];
      newFollowCities.splice(appIndex, 1);
      newFollowCities.unshift(followedCities[appIndex]);
      setFollowedCities(newFollowCities);
      await AsyncStorage.setItem(
        "@weatherApp",
        JSON.stringify({
          isTheFirst: false,
          lang: appLang,
          unit: tempUnit,
          followedCities: newFollowCities,
        })
      );
    }
  };

  const handleUnFollow = async (index, weather) => {
    const newFollowCities = followedCities.filter(
      (followedCity) => followedCity !== weather.rawCity
    );
    setFollowedCities(newFollowCities);
    const newWeatherOfCities = [...weatherOfCities];
    newWeatherOfCities.splice(index, 1);
    if (weatherOfCities[index].default === 0) {
      newWeatherOfCities[0].default = 0;
    }
    setWeatherOfCities(newWeatherOfCities);
    await AsyncStorage.setItem(
      "@weatherApp",
      JSON.stringify({
        isTheFirst: false,
        lang: appLang,
        unit: tempUnit,
        followedCities: newFollowCities,
      })
    );
    Alert.alert("Đã bỏ theo dõi " + weather.city);
  };
  return (
    <ScrollView
      contentContainerStyle={styles.widgetList}
      style={{ height: SCREEN_HEIGHT - 140 }}
    >
      <Accordion
        activeSections={selectedCity}
        sections={weatherOfCities}
        renderHeader={renderHeader}
        renderContent={renderContent}
        onChange={hanleChangeSection}
        underlayColor="rgba(0, 0, 0, 0.2)"
        duration={600}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  widgetList: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  actions: {
    height: 120,
    justifyContent: "space-between",
  },
});
