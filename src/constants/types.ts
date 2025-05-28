export type RootStackParamList = {
  BottomTabsOverview: undefined;
  HomeScreen: undefined;
  CategoryScreen: { category: string };
  GameScreen: { category: string; restart?: boolean };
  ResultScreen: { points: number; category: string };
  SettingsScreen: undefined;
};
