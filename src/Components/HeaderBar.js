import { useNavigation } from "@react-navigation/native";
import { Icon } from "@rneui/themed";
import { Text } from "react-native";
import { TouchableOpacity } from "react-native";

export function HeaderBar({ title = "Thời tiết" }) {
  const navigation = useNavigation();

  const handleBack = () => {
    navigation.setOptions({
      animations: {
        pop: {
          alpha: {
            from: 1,
            to: 0,
            duration: 300,
          },
        },
      },
    });
    navigation.goBack();
  };
  return (
    <>
      <TouchableOpacity onPress={handleBack}>
        <Icon
          name="chevron-small-left"
          type="entypo"
          color="rgba(235, 235, 245, 0.6)"
          size={68}
        />
      </TouchableOpacity>
      <Text style={{ fontSize: 28, color: "white" }}>{title}</Text>
    </>
  );
}
