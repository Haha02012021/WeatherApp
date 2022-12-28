import dayjs from "dayjs";
import { weatherBackgrounds } from "../../assets/weather_backgrounds";
import { aqi, cities } from "../../constant";

export const convertDateTime = (value, offset = -18000) => {
  let date = new Date(value * 1000);

  const utc = date.getTime();

  const nd = new Date(utc + 3600000 * -18000);
  return {
    day: "day" + nd.getDay(),
    date: nd.getDate(),
    hour: nd.getHours(),
    minute: nd.getMinutes(),
  };
};

export const determineAirQuality = (aqiIndex) => {
  for (const key in aqi) {
    if (aqi[key].maxIndex >= aqiIndex) {
      return aqi[key].quality;
    }
  }
};

export const getWeatherBg = (weather) => {
  if (weather.weather[0].main === "Clouds") {
    let time = weather.weather[0].icon.match("d") ? "d" : "n";
    const clouds = weather.clouds;

    if (clouds <= 25) {
      time = "25" + time;
    } else if (clouds <= 50) {
      time = "50" + time;
    } else if (clouds <= 84) {
      time = "84" + time;
    } else if (clouds <= 100) {
      time = "100" + time;
    }
    return weatherBackgrounds[time];
  }
  return weatherBackgrounds[weather.weather[0].icon];
};

export const searchCity = (searchValue) => {
  const result = Object.values(cities).filter((city) => {
    return city.name.toLowerCase().includes(searchValue.toLowerCase().trim());
  });

  return result;
};
