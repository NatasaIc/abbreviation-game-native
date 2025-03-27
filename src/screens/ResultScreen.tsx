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
};

const ResultScreen = ({ route }: Props) => {
  const navigation = useNavigation<NavigationProp>();
  const { points } = route.params;

  const percentages = Math.round((points / 10) * 100);

  const performanceMessage = () => {
    if (points > 7) {
      return "Du är legend!👑";
    } else if (points >= 4) {
      return "Bra jobbat!💪";
    } else {
      return "Försök igen!😅";
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.pointsText}>Du fick {points} poäng!🎉</Text>
      <Text style={styles.pointsText}>{percentages}% av maximala poängen!</Text>
      <Text style={styles.pointsText}>{performanceMessage()}</Text>
      <Pressable
        style={styles.newGameButton}
        onPress={() => navigation.navigate("GameScreen")}
      >
        <Text>Spela igen!</Text>
      </Pressable>
      <Pressable
        style={styles.newGameButton}
        onPress={() => navigation.navigate("HomeScreen")}
      >
        <Text>Avsluta</Text>
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
    padding: 15,
    borderRadius: 10,
    width: "70%",
    margin: 10,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 4,
  },
});

export default ResultScreen;
