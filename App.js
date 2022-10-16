import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Welcome from "./Screens/Welcome";
import Main from "./Screens/Main";
import SearchCities from "./Screens/SearchCities";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Welcome"
            component={Welcome}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Main"
            component={Main}
            options={{
              headerBackVisible: false,
              headerShown: false,
            }}
          />
          <Stack.Screen name="SearchCities" component={SearchCities} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
