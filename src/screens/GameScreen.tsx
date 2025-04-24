import React, { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, View, StatusBar, Dimensions, ScrollView } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../constants/types';
import { SafeAreaView } from 'react-native-safe-area-context';
import abbreviations from '../data/abbreviations_with_categories.json';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { LinearGradient } from 'expo-linear-gradient';
import { GlobalStyles } from '../constants/styles';
import { Vibration } from 'react-native';

const { height, width } = Dimensions.get('window');

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'GameScreen'>;

type GameScreenRouteProp = RouteProp<RootStackParamList, 'GameScreen'>;

const GameScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<GameScreenRouteProp>();
  const { category } = route.params;

  const [currentWord, setCurrentWord] = useState('');
  const [options, setOptions] = useState<string[]>([]);
  const [points, setPoints] = useState<number>(0);
  const [answeredQuestions, setAnsweredQuestions] = useState<Set<string>>(new Set());

  const [correctAnswer, setCorrectAnswer] = useState('');
  const [selectedOption, setSelectedOption] = useState('');
  const [showAnswer, setShowAnswer] = useState(false);
  const [guessLeft, setGuessLeft] = useState(3);
  const [hasAnswered, setHasAnswered] = useState(false);

  const generateQuestion = () => {
    const categoryAbbreviations =
      category === 'all' ? abbreviations : abbreviations.filter(item => item.category === category);

    // Filter out already answered questions
    const availableQuestions = categoryAbbreviations.filter(
      item => !answeredQuestions.has(item.abbreviation)
    );

    if (availableQuestions.length === 0) {
      navigation.navigate('ResultScreen', { points, category });
      return;
    }

    const randomIndex = Math.floor(Math.random() * availableQuestions.length);
    const selected = availableQuestions[randomIndex];

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

    // Add current question to answered set
    setAnsweredQuestions(prev => new Set([...prev, currentWord]));

    if (guessLeft - 1 === 0) {
      navigation.navigate('ResultScreen', { points, category });
    }
  };

  const handleNextQuestion = () => {
    setShowAnswer(false);
    setSelectedOption('');
    generateQuestion();
    setHasAnswered(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <View style={styles.content}>
        <Text style={styles.categoryText}>{category}</Text>
        <View style={styles.statusContainer}>
          <View style={styles.statBox}>
            <Text style={styles.statLable}>Points</Text>
            <Text style={styles.statValue}>{points}</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statLable}>Lives</Text>
            <Text style={styles.statValue}>{guessLeft}</Text>
          </View>
        </View>

        <View style={styles.wordCard}>
          <Text style={styles.currentWord}>{currentWord}</Text>
        </View>

        <ScrollView
          style={styles.optionsScrollView}
          contentContainerStyle={styles.optionsContainer}
        >
          {options.map((option, index) => (
            <Pressable
              key={index}
              style={[
                styles.optionButton,
                showAnswer &&
                  option === correctAnswer && {
                    backgroundColor: 'lightgreen',
                  },
                showAnswer &&
                  option === selectedOption &&
                  option !== correctAnswer && { backgroundColor: '#FF0000' },
              ]}
              onPress={() => handleGuess(option)}
              disabled={hasAnswered}
            >
              <Text style={styles.optionText}>{option}</Text>
            </Pressable>
          ))}
        </ScrollView>

        {hasAnswered && (
          <Pressable style={styles.nextButton} onPress={handleNextQuestion}>
            <LinearGradient colors={['#E6C229', '#F7D154']} style={styles.nextButtonGradient}>
              <Text style={styles.nextButtonText}>Next Question</Text>
            </LinearGradient>
          </Pressable>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: GlobalStyles.colors.primary500,
  },
  categoryText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '500',
    marginBottom: 30,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    paddingBottom: 30,
  },
  statusContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20,
    marginBottom: 16,
  },
  statBox: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    padding: 12,
    borderRadius: 12,
    minWidth: 100,
    alignItems: 'center',
  },
  statLable: {
    color: '#ffffff',
    fontSize: 14,
    opacity: 0.8,
  },
  statValue: {
    color: '#ffffff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  wordCard: {
    margin: 40,
    width: '100%',
    alignItems: 'center',
  },
  currentWord: {
    fontSize: 42,
    fontWeight: 'bold',
    color: GlobalStyles.colors.primary50,
    letterSpacing: 2,
    borderWidth: 1,
    borderColor: GlobalStyles.colors.primary50,
    padding: 20,
    borderRadius: 10,
  },
  optionsScrollView: {
    flex: 1,
    width: '100%',
    maxHeight: height * 0.4,
  },
  optionsContainer: {
    width: '100%',
    gap: 12,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  optionButton: {
    backgroundColor: '#FFF',
    padding: 16,
    borderRadius: 12,
    width: '100%',
    gap: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  optionText: {
    fontSize: 18,
    color: '#000',
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 10,
  },
  selectedOptionText: {
    color: '#000',
    fontWeight: 'bold',
  },
  nextButton: {
    marginTop: 30,
    width: '80%',
    borderRadius: 12,
    overflow: 'hidden',
  },
  nextButtonGradient: {
    padding: 16,
    alignItems: 'center',
  },
  nextButtonText: {
    color: '#000',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default GameScreen;
