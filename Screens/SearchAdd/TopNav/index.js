import { useNavigation } from "@react-navigation/native";
import { Icon } from "@rneui/themed";
import { LinearGradient } from "expo-linear-gradient";
import { useRef } from "react";
import { Dimensions } from "react-native";
import { Keyboard } from "react-native";
import { Animated } from "react-native";
import { TextInput } from "react-native";
import { Text } from "react-native";
import { StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native";
import { View } from "react-native";
import SearchInput from "../../../Components/Svg/SearchInput";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

export default function TopNav() {
  const navigation = useNavigation(null);
  const inputRef = useRef();

  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <Animated.View style={styles.topNav}>
      <View style={styles.leftAccessory}>
        <TouchableOpacity onPress={handleBack}>
          <Icon
            name="chevron-small-left"
            type="entypo"
            color="rgba(235, 235, 245, 0.6)"
            size={68}
          />
        </TouchableOpacity>
        <Text style={{ fontSize: 28, color: "white" }}>Thời tiết</Text>
      </View>
      <View style={styles.rightAccessory}>
        <Icon
          name="ellipsis-horizontal-circle-outline"
          type="ionicon"
          size={64}
          color="white"
        />
      </View>
      <View style={{ marginLeft: 20, marginRight: 20 }}>
        <SearchInput width={SCREEN_WIDTH - 20 * 2}></SearchInput>
        <LinearGradient
          colors={["#2E335A", "#1C1B33"]}
          start={[0, 0]}
          end={[
            Math.abs(Math.cos(168.44 / 180)),
            Math.abs(Math.sin(168.44 / 180)),
          ]}
          style={{ position: "absolute" }}
        ></LinearGradient>
        <View style={styles.extra}>
          <Icon
            name="search"
            type="feather"
            color="rgba(235, 235, 245, 0.6)"
            style={{ paddingRight: 8 }}
          />
          <TextInput
            ref={inputRef}
            inlineImageLeft="search_icon"
            placeholder="Tìm thành phố"
            placeholderTextColor={"rgba(235, 235, 245, 0.6)"}
            fontSize={17}
            style={{
              zIndex: 4,
              color: "rgba(235, 235, 245, 0.9)",
              width: SCREEN_WIDTH - 20 * 2 - 40 - 8 * 2,
            }}
            onBlur={() => {
              inputRef.current.blur();
            }}
          />
        </View>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  topNav: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingTop: 28,
    paddingBottom: 20,
    marginVertical: 20,
  },
  leftAccessory: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    width: SCREEN_WIDTH / 2,
  },
  rightAccessory: {
    flexDirection: "row",
    justifyContent: "flex-end",
    width: SCREEN_WIDTH / 2,
    right: 20,
  },
  extra: {
    flexDirection: "row",
    width: SCREEN_WIDTH - 20 * 2,
    position: "absolute",
    height: 52,
    borderRadius: 20,
    padding: 8,
    alignItems: "center",
  },
});
