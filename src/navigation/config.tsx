import React from "react";
import { BottomTabNavigationOptions } from "@react-navigation/bottom-tabs";
import { NativeStackNavigationOptions } from "@react-navigation/native-stack";
import { GlobalStyles } from "../constants/styles";
import { Ionicons } from "@expo/vector-icons";
import IconButton from "../UI/IconButton";

// Configuration for stack navigation screens
export const stackScreenOptions: NativeStackNavigationOptions = {
  headerStyle: { backgroundColor: GlobalStyles.colors.primary500 },
  headerTintColor: "white",
  contentStyle: { backgroundColor: GlobalStyles.colors.primary100 },
};

// Configuration for bottom tab navigation
export const tabScreenOptions: BottomTabNavigationOptions = {
  headerStyle: { backgroundColor: GlobalStyles.colors.primary500 },
  headerTintColor: "white",
  tabBarStyle: {
    backgroundColor: GlobalStyles.colors.primary500,
    paddingTop: 10,
    height: 90,
  },
  tabBarActiveTintColor: GlobalStyles.colors.accent500,
  tabBarInactiveTintColor: "white",
};

// Helper function to get the appropriate icon for each tab
// @param routeName - The name of the route/tab
// @returns A function that renders the appropriate icon with given color and size
export const getTabBarIcon = (routeName: string) => {
  return ({ color, size }: { color: string; size: number }) => {
    let iconName: keyof typeof Ionicons.glyphMap;

    switch (routeName) {
      case "Play":
        iconName = "game-controller";
        break;
      case "Leaderboard":
        iconName = "list";
        break;
      default:
        iconName = "help";
    }

    return <Ionicons name={iconName} size={size} color={color} />;
  };
};
