export const getWeather = async (cityName, appLang, tempUnit, setWeather) => {
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

  setFollowedWeathers({
    city: city[0].local_names[appLang],
    current: weather.current,
    hourly: weather.hourly,
    daily: weather.daily,
  });

  return {
    city: city[0].local_names[appLang],
    current: weather.current,
    hourly: weather.hourly,
    daily: weather.daily,
  };
};
