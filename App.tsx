import React from "react";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { RootStackParamList } from "./src/constants/types";
import HomeScreen from "./src/screens/HomeScreen";
import CategoryScreen from "./src/screens/CategoryScreen";
import GameScreen from "./src/screens/GameScreen";
import ResultScreen from "./src/screens/ResultScreen";
import LeaderboardScreen from "./src/screens/LeaderboardScreen";
import SettingsScreen from "./src/screens/SettingsScreen";
import {
  stackScreenOptions,
  tabScreenOptions,
  getTabBarIcon,
} from "./src/navigation/config";
import IconButton from "./src/UI/IconButton";

const Stack = createNativeStackNavigator<RootStackParamList>();
const BottomTabs = createBottomTabNavigator();

function BottomTabsOverview() {
  return (
    <BottomTabs.Navigator
      screenOptions={({ navigation }) => ({
        ...tabScreenOptions,
        headerRight: ({ tintColor }) => (
          <IconButton
            icon="settings"
            size={24}
            color={tintColor || "white"}
            onPress={() => {
              navigation.navigate("SettingsScreen");
            }}
          />
        ),
      })}
    >
      <BottomTabs.Screen
        name="Play"
        component={HomeScreen}
        options={{
          title: "Play",
          tabBarLabel: "Play",
          tabBarIcon: getTabBarIcon("Play"),
        }}
      />
      <BottomTabs.Screen
        name="Leaderboard"
        component={LeaderboardScreen}
        options={{
          title: "Leaderboard",
          tabBarLabel: "Leaderboard",
          tabBarIcon: getTabBarIcon("Leaderboard"),
        }}
      />
    </BottomTabs.Navigator>
  );
}

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <StatusBar style="auto" />
        <Stack.Navigator screenOptions={stackScreenOptions}>
          <Stack.Screen
            name="BottomTabsOverview"
            component={BottomTabsOverview}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="CategoryScreen"
            component={CategoryScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="GameScreen"
            component={GameScreen}
            options={{
              headerShown: true,
              title: "Game",
            }}
          />
          <Stack.Screen
            name="ResultScreen"
            component={ResultScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="SettingsScreen"
            component={SettingsScreen}
            options={{ headerShown: true, title: "Settings" }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}
