import React, { useEffect, useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import abbreviations from "../data/abbreviations.json";
import { SafeAreaView } from "react-native-safe-area-context";

const GameScreen = () => {
  const [currentWord, setCurrentWord] = useState("");
  const [options, setOptions] = useState<string[]>([]);
  const [points, setPoints] = useState<number>(0);
  const [feedback, setFeedback] = useState("");
  const [correctAnswer, setCorrectAnswer] = useState("");

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
  };

  return (
    <SafeAreaView style={styles.container}>
      <view>
        <View>
          <Text style={styles.points}>Poäng: {points}</Text>
        </View>
        <View>
          <Text style={styles.title}>Vad är förkorttningen?</Text>
        </View>
        <View style={styles.wordCard}>
          <Text style={styles.currentWord}>{currentWord}</Text>
        </View>
        <View style={styles.options}>
          {options.map((option, index) => (
            <Button
              key={index}
              title={option}
              onPress={() => handleGuess(option)}
            />
          ))}
        </View>
      </view>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#343d46",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#ffffff",
    marginBottom: 20,
    textAlign: "center",
  },
  wordCard: {
    padding: 100,
    marginBottom: 30,
    textAlign: "center",
    backgroundColor: "#343d46",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 20,
  },
  currentWord: {
    fontSize: 24,
    color: "#ffffff",
    letterSpacing: 3,
  },
  options: {
    flexDirection: "column",
    padding: 15,
  },
  points: {
    fontSize: 15,
    color: "yellow",
    padding: 10,
    marginBottom: 100,
  },
});

export default GameScreen;
