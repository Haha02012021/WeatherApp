import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Welcome from "./Screens/Welcome";
import Main from "./Screens/Main";
import SearchAdd from "./Screens/SearchAdd";
import Setting from "./Screens/Setting";
import AppProvider from "./Providers/AppProvider";
import FollowedCityList from "./Screens/FollowedCityList";
import { useEffect } from "react";
import { BackHandler } from "react-native";

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
          <Stack.Screen name="Setting" component={Setting} />
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
          <Stack.Screen name="FollowedCities" component={FollowedCityList} />
        </Stack.Navigator>
      </NavigationContainer>
    </AppProvider>
  );
}
