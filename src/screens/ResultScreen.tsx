import { Pressable, StyleSheet, Text, View } from "react-native";
import { RouteProp, useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { RootStackParamList } from "../navigation/types";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

type ResultScreenProp = RouteProp<RootStackParamList, "ResultScreen">;
type NavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "HomeScreen"
>;

type Props = {
  route: ResultScreenProp;
  navigation: any;
};

const ResultScreen = ({ route }: Props) => {
  const navigation = useNavigation<NavigationProp>();
  const { points } = route.params;
  return (
    <SafeAreaView style={styles.container}>
      <Text>Du fick {points} poäng!🎉</Text>
      <Pressable
        style={styles.newGameButton}
        onPress={() => navigation.navigate("GameScreen")}
      >
        Spela igen!
      </Pressable>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#6883BA",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  pointsText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#ffffff",
    marginBottom: 20,
  },
  newGameButton: {
    backgroundColor: "#4CAF50",
    padding: 10,
    borderRadius: 5,
    width: "60%",
    margin: 15,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default ResultScreen;
