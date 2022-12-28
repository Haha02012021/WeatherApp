import AsyncStorage from "@react-native-async-storage/async-storage";
import { Button } from "@rneui/themed";
import { LineChart } from "expo-chart-kit";
import { LinearGradient } from "expo-linear-gradient";
import { useContext, useEffect, useState } from "react";
import { Alert } from "react-native";
import { View, StyleSheet, Text } from "react-native";
import { Dimensions, ScrollView } from "react-native";
import { colors, langs } from "../../constant";
import { AppContext } from "../../Providers/AppProvider";
import { convertDateTime } from "../../utils/methods/index";
import Detail from "./Detail";
import Header from "./Header";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

const chartConfig = {
  backgroundGradientFrom: "#1E2923",
  backgroundGradientTo: "#08130D",
  color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
};

export default function CityWeather({ route, navigation }) {
  const city = route.params.city;
  const { appLang, tempUnit, followedCities, darkTheme, setFollowedCities } =
    useContext(AppContext);
  const [weather, setWeather] = useState();
  const [chartData, setChartData] = useState();
  const [forecast, setForecast] = useState(0);

  useEffect(() => {
    getWeather(city);
  }, [city]);

  useEffect(() => {
    if (weather) {
      if (forecast === 0) {
        const data = {
          labels: weather.hourly.map((hour) => {
            const time = convertDateTime(hour.dt);
            return time.hour + ":00";
          }),
          datasets: [
            {
              data: weather.hourly.map((hour) => {
                return hour.temp;
              }),
            },
            {
              data: weather.hourly.map((hour) => {
                return hour.feels_like;
              }),
              color: "blue",
            },
          ],
        };
        setChartData(data);
      } else {
        const data = {
          labels: weather.daily.map((day) => {
            const time = convertDateTime(day.dt);
            return langs[appLang][time.day];
          }),
          datasets: [
            {
              data: weather.daily.map((day) => {
                return day.temp.day;
              }),
            },
            {
              data: weather.daily.map((day) => {
                return day.feels_like.day;
              }),
              color: "blue",
            },
          ],
        };
        setChartData(data);
      }
    }
  }, [weather, forecast]);

  const getWeather = async (cityName) => {
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

    setWeather({
      city: city[0].local_names[appLang],
      current: weather.current,
      hourly: weather.hourly,
      daily: weather.daily,
    });
  };

  const handleChangeForecastType = (forecastType) => {
    if (forecastType !== forecast) {
      setForecast(forecastType);
    }
  };

  const handleBack = () => {
    navigation.setOptions({
      animations: {
        pop: {
          alpha: {
            from: 1,
            to: 0,
            duration: 300,
          },
        },
      },
    });
    navigation.goBack();
  };

  const handleFollow = async () => {
    const newFollowCities = [...followedCities, city];
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
    Alert.alert("Đã theo dõi " + weather.city);
  };

  const handleUnFollow = async () => {
    const newFollowCities = followedCities.filter(
      (followedCity) => followedCity !== city
    );
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
    Alert.alert("Đã bỏ theo dõi " + weather.city);
  };

  return (
    <>
      {weather && (
        <LinearGradient
          colors={colors[darkTheme].gradient}
          start={[0, 0]}
          end={[
            Math.abs(Math.cos(168.44 / 180)),
            Math.abs(Math.sin(168.44 / 180)),
          ]}
          style={styles.container}
        >
          <Header
            city={weather.city}
            currentWeather={weather.current}
            onClickForecastType={(forecastType) =>
              handleChangeForecastType(forecastType)
            }
          />
          <Text style={styles.title}>{langs[appLang].forecast}</Text>
          {chartData && (
            <View
              style={{ height: 240, alignItems: "center", marginVertical: 8 }}
            >
              <ScrollView
                style={styles.chart}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
              >
                <LineChart
                  data={chartData}
                  width={chartData.labels.length * (SCREEN_WIDTH / 8)}
                  height={240}
                  chartConfig={chartConfig}
                />
              </ScrollView>
            </View>
          )}
          <Text style={styles.title}>{langs[appLang].details}</Text>
          <Detail currentWeather={weather.current} />
          <View style={styles.actions}>
            <Button
              onPress={handleBack}
              title={langs[appLang].back}
              type="outline"
            />
            {followedCities.includes(city) ? (
              <>
                <Button
                  onPress={handleUnFollow}
                  color="red"
                  title={langs[appLang].unFollow}
                />
              </>
            ) : (
              <Button onPress={handleFollow} title={langs[appLang].follow} />
            )}
          </View>
        </LinearGradient>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
  },
  chart: {
    height: 0,
    paddingVertical: 0,
    marginVertical: 0,
  },
  title: {
    fontSize: 16,
    color: "white",
  },
  actions: {
    height: 120,
    flexDirection: "column",
    justifyContent: "space-between",
    marginVertical: 8,
  },
});
