import { useEffect, useRef } from "react";
import { Animated, StyleSheet, Text, View } from "react-native";

export default function Welcome({ navigation }) {
  const fadeAnim = useRef(new Animated.Value(0)).current; // Initial value for opacity: 0

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();

    setTimeout(() => {
      navigation.navigate("Main");
    }, 1100);
  }, [fadeAnim]);

  return (
    <Animated.View style={[styles.container]}>
      <Text style={styles.content}>TODAY'S WEATHER</Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  content: {
    fontSize: 64,
    fontWeight: "bold",
  },
});
