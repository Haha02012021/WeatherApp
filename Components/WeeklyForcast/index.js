import { useState } from "react";
import { Image } from "react-native";
import { StyleSheet } from "react-native";
import { View, Text } from "react-native";
import Accordion from "react-native-collapsible/Accordion";
import Card from "./Card";
import { Icon } from "@rneui/themed";
import { useContext } from "react";
import { AppContext } from "../../Providers/AppProvider";
import { ScrollView } from "react-native-gesture-handler";

export default function WeeklyForcast({ daily }) {
  const { tempUnit } = useContext(AppContext);
  const [selectedDate, setSelectedDate] = useState([]);
  const hanleChangeSection = (indexes) => {
    if (selectedDate.length === 1) {
      if (selectedDate[0] === indexes[0]) {
        setSelectedDate([]);
      } else {
        setSelectedDate(indexes);
      }
    } else {
      setSelectedDate(indexes);
    }
  };

  console.log(selectedDate);

  const getDay = (number) => {
    const date = new Date(number * 1000);

    if (date.getDay() > 0) {
      return "Thứ " + (date.getDay() + 1);
    } else {
      return "Chủ nhật";
    }
  };

  const getDateDetail = (number) => {
    const date = new Date(number * 1000);

    return {
      date: date.getDate(),
      hour: date.getHours(),
      minute: date.getMinutes(),
    };
  };

  const renderHeader = (content, index, isActive, sections) => {
    return (
      <View style={styles.headerSection}>
        <View style={styles.leftHeaderSection}>
          <Text style={[styles.text, { fontSize: 16 }]}>
            {getDay(content.dt)}
          </Text>
          <Text style={[styles.text, { fontSize: 8 }]}>
            {content.weather[0].description}
          </Text>
        </View>
        <View>
          <Image
            source={require("../../assets/weather_icons/cloud/22.png")}
            style={{ height: 44, width: 44 }}
            resizeMode="contain"
          />
        </View>
        <View style={styles.rightHeaderSection}>
          <Text style={styles.text}>{Math.round(content.temp.max)}°</Text>
          <Text style={[styles.text, styles.minTemp]}>
            {Math.round(content.temp.min)}°
          </Text>
        </View>
      </View>
    );
  };

  const renderContent = (content, index, isActive, sections) => {
    return (
      <View style={styles.contentSection}>
        <Card
          iconName={"thermometer"}
          title="Nhiệt độ"
          row1={
            <>
              <Icon
                type="feather"
                name="sun"
                color={"rgba(255, 255, 255, 0.7)"}
                style={{ marginRight: 16 }}
                size={40}
              />
              <Text style={[styles.contentText, { fontSize: 20 }]}>
                {Math.round(content.temp.day)}°
              </Text>
            </>
          }
          row2={
            <>
              <Icon
                type="feather"
                name="moon"
                color={"rgba(255, 255, 255, 0.7)"}
                style={{ marginRight: 16 }}
                size={40}
              />
              <Text style={[styles.contentText, { fontSize: 20 }]}>
                {Math.round(content.temp.day)}°
              </Text>
            </>
          }
        />
        <Card
          iconName={"water"}
          iconType="font-awesome-5"
          title="Độ ẩm"
          row1={
            <>
              <Text style={[styles.contentText, { fontSize: 32 }]}>
                {content.humidity}%
              </Text>
            </>
          }
          row2={
            <>
              <Text style={[styles.contentText, { fontSize: 8 }]}>
                Điểm sương: {content.dew_point}
              </Text>
            </>
          }
        />
        <Card
          iconName={"drop"}
          iconType="entypo"
          title="Mưa"
          row1={
            <>
              <Text style={[styles.contentText, { fontSize: 32 }]}>
                {content.rain ? content.rain : "0"}
              </Text>
              <Text style={[styles.contentText, { fontSize: 12 }]}>mm</Text>
            </>
          }
          row1Style={{ alignItems: "flex-end" }}
          row2={
            <>
              <Icon
                type="feather"
                name="cloud"
                color="rgba(255, 255, 255, 0.7)"
                size={12}
                style={{ marginRight: 4 }}
              />
              <Text style={[styles.contentText, { fontSize: 8 }]}>
                Mây {content.clouds}%
              </Text>
            </>
          }
        />
        <Card
          iconName={"sun"}
          title="Mức UV"
          row1={
            <>
              <Text style={[styles.contentText, { fontSize: 32 }]}>
                {content.uvi}
              </Text>
            </>
          }
          row2={
            <Text style={[styles.contentText, { fontSize: 8 }]}>Không có</Text>
          }
        />
        <Card
          iconName={"wind"}
          title="Gió"
          row1={
            <>
              <Text style={[styles.contentText, { fontSize: 32 }]}>
                {content.wind_speed}
              </Text>
              <Text style={[styles.contentText, { fontSize: 12 }]}>
                {tempUnit === "metric" ? " m/s" : " m/h"}
              </Text>
            </>
          }
          row1Style={{ alignItems: "flex-end", bottom: "32%" }}
        />
        <Card
          iconName={"sunrise"}
          title="Mọc"
          row1={
            <>
              <Text style={[styles.contentText, { fontSize: 32 }]}>
                {getDateDetail(content.sunrise).hour}:00
              </Text>
            </>
          }
          row2={
            <>
              <Icon
                type="feather"
                name={"sunset"}
                color={"rgba(255, 255, 255, 0.7)"}
                size={12}
                style={{ marginRight: 4 }}
              />
              <Text style={[styles.contentText, { fontSize: 8 }]}>
                Lặn {getDateDetail(content.sunset).hour}:
                {getDateDetail(content.sunset).minute}
              </Text>
            </>
          }
        />
      </View>
    );
  };
  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
      <Accordion
        activeSections={selectedDate}
        sections={daily}
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
  container: {
    marginHorizontal: 40,
    marginVertical: 28,
  },
  text: {
    color: "white",
    opacity: 0.8,
    fontSize: 18,
  },
  headerSection: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    padding: 8,
    alignItems: "center",
  },
  leftHeaderSection: {
    width: "24%",
  },
  rightHeaderSection: {
    flexDirection: "row",
    width: "20%",
    justifyContent: "space-between",
  },
  minTemp: {
    opacity: 0.6,
  },

  contentSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 4,
    flexWrap: "wrap",
  },
  contentText: {
    color: "white",
    opacity: 0.7,
  },
});
