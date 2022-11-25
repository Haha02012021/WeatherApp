import { Icon } from "@rneui/themed";
import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet } from "react-native";
import { Text } from "react-native";
import { View } from "react-native";

export default function Card({
  iconType = "feather",
  iconName,
  title,
  row1,
  row2,
  row1Style,
}) {
  return (
    <LinearGradient
      colors={["rgba(0, 0, 0, 0.2)", "rgba(0, 0, 0, 0.3)"]}
      start={[0, 0]}
      end={[Math.abs(Math.cos(168.44 / 180)), Math.abs(Math.sin(168.44 / 180))]}
      style={styles(row2).container}
    >
      <View style={styles(row2).header}>
        <Icon
          type={iconType}
          name={iconName}
          color="rgba(255, 255, 255, 0.8)"
          style={styles(row2).icon}
        />
        <Text style={[styles(row2).text, { marginHorizontal: 2 }]}>
          {title}
        </Text>
      </View>
      <View style={styles.content}>
        <View style={[styles(row2).row1, row1Style]}>{row1}</View>
        <View style={styles(row2).row2}>{row2}</View>
      </View>
    </LinearGradient>
  );
}

const styles = (row2) =>
  StyleSheet.create({
    container: {
      padding: 8,
      width: "32%",
      marginVertical: 4,
      borderWidth: 2,
      borderRadius: 8,
      borderTopRightRadius: 8,
      borderTopLeftRadius: 8,
      borderBottomLeftRadius: 8,
      borderBottomRightRadius: 8,
      borderColor: "rgba(255, 255, 255, 0.1)",
      justifyContent: "space-between",
      maxHeight: 180,
    },
    text: {
      color: "rgba(255, 255, 255, 0.8)",
    },
    icon: { marginHorizontal: 2 },
    header: {
      flexDirection: "row",
      borderBottomWidth: 2,
      paddingVertical: 8,
      borderColor: "rgba(255, 255, 255, 0.2)",
    },
    content: {},
    row1: {
      flexDirection: "row",
      alignItems: "center",
      paddingVertical: 8,
    },
    row2: {
      flexDirection: "row",
      alignItems: "center",
      paddingVertical: 8,
      borderTopWidth: 2,
      borderColor: "rgba(255, 255, 255, 0.2)",
      display: row2 ? "flex" : "none",
    },
  });
