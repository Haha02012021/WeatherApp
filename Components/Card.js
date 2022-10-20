import { Icon } from "@rneui/themed/dist/Icon";
import { Dimensions } from "react-native";
import { StyleSheet } from "react-native";
import { Text } from "react-native";
import { View } from "react-native";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

export default function Card({ iconName, cardName, value, note, smallNote }) {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Icon
          name={iconName}
          type="feather"
          color="rgba(235, 235, 245, 0.6)"
          size={20}
        />
        <Text style={styles.cardName}>{cardName}</Text>
      </View>
      <View>
        <Text style={styles.value}>{value}</Text>
        <Text style={styles.note}>{note}</Text>
        <Text style={styles.smallNote}>{smallNote}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 16,
    backgroundColor: "rgba(0, 0, 0, 0.1)",
    width: SCREEN_WIDTH / 2 - 26 * 2,
    height: SCREEN_WIDTH / 2 - 26 * 2,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: "rgba(0, 0, 0, 0.2)",
    paddingHorizontal: 8,
    paddingVertical: 6,
    alignSelf: "flex-start",
    marginHorizontal: "2%",
  },
  header: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  cardName: {
    color: "rgba(235, 235, 245, 0.6)",
    marginLeft: 4,
    fontSize: 14,
  },
  value: {
    color: "white",
    fontSize: 28,
  },
  note: {
    color: "white",
    fontSize: 16,
  },
  smallNote: {
    color: "white",
    fontSize: 12,
  },
});
