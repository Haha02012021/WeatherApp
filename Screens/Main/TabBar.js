import { Icon } from "@rneui/themed";
import { LinearGradient } from "expo-linear-gradient";
import { Dimensions } from "react-native";
import { StyleSheet, View } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { TouchableNativeFeedback } from "react-native";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

export default function TabBar() {
  return (
    <View style={styles.container}>
      <View style={styles.curveShape} />
      <Front />
      <Back />
    </View>
  );
}

function Front() {
  const navigation = useNavigation()
  const handlePlus = () => {
    navigation.navigate("SearchCities");
  };
  return (
    <View style={styles.front}>
      <LinearGradient colors={["red", "blue"]} style={styles.subtract} />
      <TouchableNativeFeedback style={styles.toucher} onPress={handlePlus}>
        <View style={styles.mask}>
          <Icon
            name="plus"
            type="feather"
            style={styles.plus}
            color="rgba(72, 49, 157, 1)"
            size={28}
          />
        </View>
      </TouchableNativeFeedback>
    </View>
  );
}

function Back() {
  return (
    <View style={styles.back}>
      <Icon
        name="map-pin"
        type="font-awesome-5"
        color="white"
        style={styles.backIcon}
        size={28}
      />
      <Icon
        name="bars"
        type="font-awesome-5"
        color={"white"}
        style={styles.backIcon}
        size={28}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  // curveShape: {
  //   // position: "absolute",
  //   borderLeftColor: "transparent",
  //   borderRightColor: "transparent",
  //   borderTopColor: "transparent",
  //   borderBottomColor: "rgba(117, 130, 244, 0.5)",
  //   bottom: 60,
  //   zIndex: 2,
  //   borderWidth: 1,
  //   borderRadius: (SCREEN_WIDTH * 1.2) / 2,
  //   width: SCREEN_WIDTH * 1.2,
  //   backgroundColor: "transparent",
  //   height: SCREEN_WIDTH * 1.2,
  //   left: -SCREEN_WIDTH * 0.1,
  //   transform: [{ scaleX: 1.5 }],
  // },
  front: {
    position: "absolute",
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    height: 100,
    bottom: 0,
  },
  mask: {
    backgroundColor: "white",
    width: 64,
    height: 64,
    borderRadius: 100,
    borderColor: "rgba(255, 255, 255, 0.304)",
    borderWidth: 4,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 2,
    marginTop: 12,
  },
  toucher: {
    zIndex: 2,
  },
  plus: {},
  subtract: {
    position: "absolute",
    width: 200,
    height: "100%",
    borderBottomWidth: 100,
    borderBottomColor: "transparent",
    borderLeftWidth: 50,
    borderLeftColor: "transparent",
    borderRightWidth: 50,
    borderRightColor: "transparent",
    borderStyle: "solid",
    borderRadius: 200,
  },
  back: {
    position: "absolute",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    height: 88,
    bottom: 0,
  },
  backIcon: {
    paddingLeft: 16,
    paddingRight: 16,
    marginLeft: 20,
    marginRight: 20,
  },
});
