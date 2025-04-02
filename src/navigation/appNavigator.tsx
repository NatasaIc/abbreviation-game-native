import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RootStackParamList } from "./types";
import GameScreen from "../screens/GameScreen";
import HomeScreen from "../screens/HomeScreen";
import ResultScreen from "../screens/ResultScreen";
import CategoryScreen from "../screens/CategoryScreen";

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HomeScreen"
        options={{ title: "Välkommen" }}
        component={HomeScreen}
      />
      <Stack.Screen
        name="CategoryScreen"
        options={{ title: "Kategorier" }}
        component={CategoryScreen}
      />
      <Stack.Screen
        name="GameScreen"
        options={{ title: "Spela" }}
        component={GameScreen}
      />
      <Stack.Screen
        name="ResultScreen"
        options={{ title: "Resultat" }}
        component={ResultScreen}
      />
    </Stack.Navigator>
  );
};

export default AppNavigator;
