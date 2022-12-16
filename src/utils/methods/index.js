export const convertDateTime = (value, lang) => {
  const date = new Date(value * 1000);

  return {
    day: "day" + date.getDay(),
    date: date.getDate(),
    hour: date.getHours(),
    minute: date.getMinutes(),
  };
};
