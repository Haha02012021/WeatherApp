import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Welcome from "./src/Screens/Welcome";
import Setting from "./src/Screens/Setting";
import Main from "./src/Screens/Main";
import SearchAdd from "./src/Screens/SearchAdd";
import FollowedCityList from "./src/Screens/FollowedCityList";
import CityWeather from "./src/Screens/CityWeather";
import AppProvider from "./src/Providers/AppProvider";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <AppProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ gestureEnabled: true }}>
          <Stack.Screen
            name="Welcome"
            component={Welcome}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Setting"
            component={Setting}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Main"
            component={Main}
            options={{
              headerBackVisible: false,
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="SearchAdd"
            component={SearchAdd}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="FollowedCities"
            component={FollowedCityList}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="CityWeather"
            component={CityWeather}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </AppProvider>
  );
}
