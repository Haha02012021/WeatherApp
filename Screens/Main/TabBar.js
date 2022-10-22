import { Icon } from "@rneui/themed";
import { Dimensions } from "react-native";
import { StyleSheet, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import CurveShape from "../../Components/Svg/CurveShape";
import Subtract from "../../Components/Svg/Subtract";
import PlusButton from "../../Components/Svg/PlusButton";
import { TouchableOpacity } from "react-native-gesture-handler";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

export default function TabBar() {
  return (
    <View style={styles.container}>
      <View style={styles.curveShape}>
        <CurveShape />
      </View>
      <Front />
      <Back />
    </View>
  );
}

function Front() {
  const navigation = useNavigation();
  const handlePlus = () => {
    navigation.navigate("SearchAdd");
  };
  return (
    <View style={styles.front}>
      <Subtract style={styles.subtract} />
      <TouchableOpacity style={styles.toucher} onPress={handlePlus}>
        <PlusButton />
      </TouchableOpacity>
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
    height: 100,
  },
  curveShape: {
    left: -(700 - SCREEN_WIDTH) / 2,
    bottom: 0,
  },
  front: {
    position: "absolute",
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    height: 100,
    bottom: 0,
  },
  toucher: {
    zIndex: 2,
  },
  subtract: {
    position: "absolute",
    width: 200,
    height: "100%",
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
