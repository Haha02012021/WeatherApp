import { Overlay } from "@rneui/themed";
import { Dimensions } from "react-native";
import { StyleSheet } from "react-native";
import { View } from "react-native";
import ListItem from "../../../Components/ListItem";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("screen");

export default function CitiesOverlay({ isVisible, followedCities }) {
  return (
    <Overlay isVisible={isVisible}>
      <View style={styles.overlay}>
        {followedCities.map((followedCity, index) => {
          return <ListItem key={index} />;
        })}
      </View>
    </Overlay>
  );
}

const styles = StyleSheet.create({
  overlay: {
    width: SCREEN_WIDTH - 80,
    maxHeight: SCREEN_HEIGHT / 2,
  },
});
