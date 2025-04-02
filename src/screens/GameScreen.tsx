import React, { useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../navigation/types";
import { SafeAreaView } from "react-native-safe-area-context";
import abbreviations from "../data/abbreviations.json";
import abbreviations_with_categories from "../data/abbreviations_with_categories.json";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

type NavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "GameScreen"
>;

const GameScreen = () => {
  const navigation = useNavigation<NavigationProp>();

  const [currentWord, setCurrentWord] = useState("");
  const [options, setOptions] = useState<string[]>([]);
  const [points, setPoints] = useState<number>(0);

  const [correctAnswer, setCorrectAnswer] = useState("");
  const [selectedOption, setSelectedOption] = useState("");
  const [showAnswer, setShowAnswer] = useState(false);
  const [guessLeft, setGuessLeft] = useState(3);
  const [hasAnswered, setHasAnswered] = useState(false);

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
    setSelectedOption(option);
    if (option === correctAnswer) {
      setPoints(points + 1);
      setHasAnswered(true);
      setShowAnswer(true);
    } else {
      setShowAnswer(true);
      setGuessLeft(guessLeft - 1);
      setHasAnswered(true);
    }

    if (guessLeft - 1 === 0) {
      navigation.navigate("ResultScreen", { points });
    }
  };

  const handleNextQuestion = () => {
    setShowAnswer(false);
    setSelectedOption("");
    generateQuestion();
    setHasAnswered(false);
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
            style={[
              styles.optionButton,
              showAnswer &&
                option === correctAnswer && { backgroundColor: "lightgreen" },
              showAnswer &&
                option === selectedOption &&
                option !== correctAnswer && { backgroundColor: "#FF0000" },
            ]}
            onPress={() => handleGuess(option)}
            disabled={hasAnswered}
          >
            <Text style={styles.optionText}>{option}</Text>
          </Pressable>
        ))}
        <View>
          {hasAnswered && (
            <Pressable style={styles.nextButton} onPress={handleNextQuestion}>
              <Text style={styles.nextButtonText}>Nästa fråga</Text>
            </Pressable>
          )}
        </View>
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
  feedbackText: {
    color: "#FF0000",
    fontSize: 18,
    marginVertical: 10,
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
  nextButton: {
    backgroundColor: "#E6C229",
    padding: 15,
    borderRadius: 8,
    marginTop: 20,
    alignItems: "center",
  },
  nextButtonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
    textAlign: "center",
  },
});

export default GameScreen;
