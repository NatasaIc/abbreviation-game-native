import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from './src/constants/types';
import HomeScreen from './src/screens/HomeScreen';
import CategoryScreen from './src/screens/CategoryScreen';
import GameScreen from './src/screens/GameScreen';
import ResultScreen from './src/screens/ResultScreen';
import SettingsScreen from './src/screens/SettingsScreen';
import IconButton from './src/UI/IconButton';
import { GlobalStyles } from './src/constants/styles';

const Stack = createNativeStackNavigator<RootStackParamList>();

function Navigation() {
  return (
    <Stack.Navigator
      screenOptions={({ navigation }) => ({
        headerStyle: {
          backgroundColor: GlobalStyles.colors.primary700,
          shadowColor: 'transparent',
        },
        headerTintColor: GlobalStyles.colors.accent500,

        headerRight: () => (
          <IconButton
            icon="settings"
            size={20}
            color={GlobalStyles.colors.accent500}
            onPress={() => {
              navigation.navigate('SettingsScreen');
            }}
          />
        ),
        headerRightContainerStyle: {
          paddingRight: 20,
        },
      })}
    >
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          headerShown: true,
          title: 'Home',
        }}
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
          title: 'Game',
        }}
      />
      <Stack.Screen name="ResultScreen" component={ResultScreen} options={{ headerShown: false }} />
      <Stack.Screen
        name="SettingsScreen"
        component={SettingsScreen}
        options={{ headerShown: true, title: 'Settings' }}
      />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <StatusBar style="auto" />
        <Navigation />
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}
