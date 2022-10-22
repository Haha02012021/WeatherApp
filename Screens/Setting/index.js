import { useContext, useEffect } from "react";
import { Text } from "react-native";
import { StyleSheet } from "react-native";
import { View } from "react-native";
import { AppContext } from "../../Providers/AppProvider";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { RectButton } from "react-native-gesture-handler";
import { Button } from "@rneui/themed";
import { useNavigation } from "@react-navigation/native";

export default function Setting() {
  const { isTheFirst, setTheFirst } = useContext(AppContext);
  const navigation = useNavigation();
  useEffect(() => {
    const createAppKey = async () => {
      await AsyncStorage.setItem("@weatherAppKey", "my weather app");
    };

    if (isTheFirst) {
      setTheFirst(false);
      createAppKey();
    }
  }, []);

  const handleRemoveKey = async () => {
    await AsyncStorage.removeItem("@weatherAppKey");
  };

  return (
    <View style={styles.container}>
      <Text>Setting Screen</Text>
      <Button onPress={handleRemoveKey}>
        <Text>Remove App Key</Text>
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
