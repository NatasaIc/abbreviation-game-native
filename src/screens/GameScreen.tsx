import React, { useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../navigation/types";
import { SafeAreaView } from "react-native-safe-area-context";
import abbreviations from "../data/abbreviations.json";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

type NavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "GameScreen"
>;

const GameScreen = () => {
  const [currentWord, setCurrentWord] = useState("");
  const [options, setOptions] = useState<string[]>([]);
  const [points, setPoints] = useState<number>(0);
  const [feedback, setFeedback] = useState("");
  const [correctAnswer, setCorrectAnswer] = useState("");
  const [guessLeft, setGuessLeft] = useState(2);

  const navigation = useNavigation<NavigationProp>();

  const generateQuestion = () => {
    const randomIndex = Math.floor(Math.random() * abbreviations.length);
    const selected = abbreviations[randomIndex];

    const shuffleArray = (array: string[]) => {
      return [...array].sort(() => Math.random() - 0.5);
    };

    setCurrentWord(selected.abbreviation);
    setOptions(shuffleArray(selected.options));
    setCorrectAnswer(selected.correct_answer);
  };

  useEffect(() => {
    generateQuestion();
  }, []);

  const handleGuess = (option: string) => {
    if (option === correctAnswer) {
      setPoints(points + 1);
      setFeedback("Rätt!🎉");
    } else {
      setFeedback("Fel! ��" + correctAnswer);
    }
    setTimeout(() => {
      setFeedback("");
      generateQuestion();
    }, 2000);

    setGuessLeft(guessLeft - 1);

    if (guessLeft - 1 === 0) {
      navigation.navigate("ResultScreen", { points });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <View style={styles.header}>
          <Text style={styles.points}>Poäng: {points}</Text>
          <Text style={styles.points}>Liv: {guessLeft}</Text>
        </View>
        <View>
          <Text style={styles.title}>Gissa förkorttningen?</Text>
        </View>
        <View style={styles.wordCard}>
          <Text style={styles.currentWord}>{currentWord}</Text>
        </View>
        {options.map((option, index) => (
          <Pressable
            key={index}
            style={styles.optionButton}
            onPress={() => handleGuess(option)}
          >
            <Text style={styles.optionText}>{option}</Text>
          </Pressable>
        ))}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#6883BA",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    color: "#ffffff",
    marginBottom: 20,
    textAlign: "center",
  },
  wordCard: {
    padding: 80,
    marginBottom: 30,
    backgroundColor: "#F9F9F9",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 20,
  },
  currentWord: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000",
    letterSpacing: 3,
    textAlign: "center",
  },
  optionButton: {
    backgroundColor: "#ffffff",
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginVertical: 10,
    borderRadius: 8,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  optionText: {
    fontSize: 18,
    color: "#000",
    fontWeight: "300",
    textAlign: "center",
    padding: 10,
  },
  header: {
    marginBottom: 30,
    paddingHorizontal: 20,
    backgroundColor: "#6883BA",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 20,
    borderRadius: 10,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
  },
  points: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#E6C229",
    padding: 10,
  },
});

export default GameScreen;
