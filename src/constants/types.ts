export type RootStackParamList = {
  BottomTabsOverview: undefined;
  HomeScreen: undefined;
  CategoryScreen: { category: string };
  GameScreen: { category: string };
  ResultScreen: { points: number; category: string };
};
