import { Animated } from "react-native";
import { Text } from "react-native";
import { RectButton, Swipeable } from "react-native-gesture-handler";

export default function ListItem() {
  const renderRightActions = (progress, dragX) => {
    console.log(dragX);
    const trans = dragX.interpolate({
      inputRange: [0, 0],
      outputRange: [0, -80],
    });
    return (
      <RectButton>
        <Animated.Text
          style={[
            {
              transform: [{ translateX: trans }],
            },
          ]}
        >
          Archive
        </Animated.Text>
      </RectButton>
    );
  };
  return (
    <Swipeable renderRightActions={renderRightActions}>
      <Text>Abc</Text>
    </Swipeable>
  );
}
