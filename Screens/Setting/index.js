import { useContext, useEffect } from "react";
import { Text } from "react-native";
import { StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Button, CheckBox, Switch } from "@rneui/themed";
import { LinearGradient } from "expo-linear-gradient";
import { AppContext } from "../../Providers/AppProvider";
import { View } from "react-native";
import { HeaderBar } from "../../Components/HeaderBar";
import { useState } from "react";

const langs = ["vi", "en"];
const units = ["C", "F"];

export default function Setting({ navigation }) {
  const {
    isTheFirst,
    setTheFirst,
    appLang,
    setAppLang,
    tempUnit,
    setTempUnit,
  } = useContext(AppContext);
  const [currentLang, setCurrentLang] = useState(appLang);
  const [currentUnit, setCurrentUnit] = useState(tempUnit);
  useEffect(() => {
    const createAppKey = async () => {
      await AsyncStorage.setItem("@weatherAppKey", "my weather app");
    };

    if (isTheFirst) {
      setTheFirst(false);
      createAppKey();
    }
  }, []);

  const handleRemoveKey = async () => {
    await AsyncStorage.removeItem("@weatherAppKey");
  };

  const handleChangeLang = (lang) => {
    if (currentLang != lang) {
      setCurrentLang(lang);
    }
  };

  const handleChangeUnit = (unit) => {
    if (currentUnit != unit) {
      setCurrentUnit(unit);
    }
  };

  return (
    <LinearGradient
      colors={["#2E335A", "#1C1B33"]}
      start={[0, 0]}
      end={[Math.abs(Math.cos(168.44 / 180)), Math.abs(Math.sin(168.44 / 180))]}
      style={styles.container}
    >
      <View style={styles.headerBar}>
        <HeaderBar title="Cài đặt" />
      </View>
      <View style={styles.content}>
        <View>
          <Text style={styles.label}>Ngôn ngữ</Text>
          {langs.map((lang) => {
            return (
              <CheckBox
                title={lang.toLocaleUpperCase()}
                checkedIcon="dot-circle-o"
                uncheckedIcon="circle-o"
                checked={currentLang === lang}
                checkedColor="purple"
                containerStyle={{
                  backgroundColor: "transparent",
                }}
                textStyle={{
                  color: "white",
                }}
                onIconPress={() => handleChangeLang(lang)}
                key={lang}
                // checked={check1}
                // onPress={() => setCheck1(!check1)}
              />
            );
          })}
        </View>
        <View>
          <Text style={styles.label}>Đơn vị đo độ</Text>
          {units.map((unit) => {
            return (
              <CheckBox
                key={unit}
                title={unit}
                checkedIcon="dot-circle-o"
                uncheckedIcon="circle-o"
                checked={currentUnit === unit}
                checkedColor="purple"
                containerStyle={{
                  backgroundColor: "transparent",
                }}
                textStyle={{
                  color: "white",
                }}
                onIconPress={() => handleChangeUnit(unit)}
                // checked={check1}
                // onPress={() => setCheck1(!check1)}
              />
            );
          })}
        </View>
        <View style={styles.actions}>
          <Button
            type="outline"
            buttonStyle={[{ borderColor: "white" }, styles.button]}
            titleStyle={{ color: "white" }}
          >
            Lưu
          </Button>
          <Button
            buttonStyle={[
              { backgroundColor: "rgba(255, 255, 255, 0.4)" },
              styles.button,
            ]}
            titleStyle={{ color: "white" }}
          >
            Bỏ qua
          </Button>
        </View>
      </View>
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
  content: {
    marginLeft: 20,
    marginRight: 20,
  },
  label: {
    color: "white",
    fontSize: 20,
  },
  actions: {
    flexDirection: "row",
    right: 0,
  },

  button: {
    marginHorizontal: 8,
  },
});
