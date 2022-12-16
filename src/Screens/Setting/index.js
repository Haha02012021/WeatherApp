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
import { langs } from "../../constant";

const langOptions = ["vi", "en"];
const units = [
  {
    symbol: "C",
    code: "metric",
  },
  {
    symbol: "F",
    code: "imperial",
  },
];

export default function Setting({ navigation }) {
  const {
    isTheFirst,
    setTheFirst,
    appLang,
    tempUnit,
    followedCities,
    setAppLang,
    setTempUnit,
  } = useContext(AppContext);
  const [currentLang, setCurrentLang] = useState(appLang);
  const [currentUnit, setCurrentUnit] = useState(tempUnit);
  useEffect(() => {
    const createAppKey = async () => {
      await AsyncStorage.setItem(
        "@weatherApp",
        JSON.stringify({
          isTheFirst: false,
          lang: "vi",
          unit: "metric",
          followedCities: ["ha noi", "thai binh"],
        })
      );
    };

    if (isTheFirst) {
      setTheFirst(false);
      createAppKey();
    } else {
      // console.log(appLang, tempUnit);
    }
  }, []);

  const handleRemoveKey = async () => {
    await AsyncStorage.removeItem("@weatherAppKey");
    await AsyncStorage.removeItem("@weatherApp");
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

  const handleSave = async () => {
    setAppLang(currentLang);
    setTempUnit(currentUnit);
    await AsyncStorage.setItem(
      "@weatherApp",
      JSON.stringify({
        isTheFirst: false,
        lang: currentLang,
        unit: currentUnit,
        followedCities: followedCities,
      })
    );

    navigation.navigate("Main");
  };

  const handleCancel = () => {
    navigation.navigate("Main");
  };

  return (
    <LinearGradient
      colors={["#2E335A", "#1C1B33"]}
      start={[0, 0]}
      end={[Math.abs(Math.cos(168.44 / 180)), Math.abs(Math.sin(168.44 / 180))]}
      style={styles.container}
    >
      <View style={styles.headerBar}>
        <HeaderBar title={langs[currentLang].setting} />
      </View>
      <View style={styles.content}>
        <View>
          <Text style={styles.label}>{langs[currentLang].lang}</Text>
          {langOptions.map((lang) => {
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
          <Text style={styles.label}>{langs[currentLang].degreeUnit}</Text>
          {units.map((unit) => {
            return (
              <CheckBox
                key={unit.code}
                title={unit.symbol}
                checkedIcon="dot-circle-o"
                uncheckedIcon="circle-o"
                checked={currentUnit === unit.code}
                checkedColor="purple"
                containerStyle={{
                  backgroundColor: "transparent",
                }}
                textStyle={{
                  color: "white",
                }}
                onIconPress={() => handleChangeUnit(unit.code)}
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
            onPress={handleSave}
          >
            {langs[currentLang].save}
          </Button>
          <Button
            buttonStyle={[
              { backgroundColor: "rgba(255, 255, 255, 0.4)" },
              styles.button,
            ]}
            titleStyle={{ color: "white" }}
            onPress={handleCancel}
          >
            {langs[currentLang].cancel}
          </Button>
          {/* <Button onPress={handleRemoveKey}>RemoveKey</Button> */}
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
