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
import { Audio } from 'expo-av';
import AsyncStorage from '@react-native-async-storage/async-storage';
import GameStatus from '../components/GameStatus';
import OptionButton from '../components/OptionButton';
import WordCard from '../components/WordCard';

const { height, width } = Dimensions.get('window');

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'GameScreen'>;

type GameScreenRouteProp = RouteProp<RootStackParamList, 'GameScreen'>;

/**
 * GameScreen Component
 *
 * Main game screen where users play the abbreviation quiz game.
 * Features:
 * - Displays current abbreviation to guess
 * - Shows multiple choice options
 * - Tracks points and lives
 * - Handles sound effects and vibration feedback
 * - Manages game state and navigation
 */
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

  const [settings, setSettings] = useState({
    soundEffects: true,
    vibration: true,
    fontSize: 'Medium',
    notification: true,
    username: '',
  });

  useEffect(() => {
    const loadSettings = async () => {
      try {
        const savedSettings = await AsyncStorage.getItem('userSettings');
        console.log('Loaded settings in GameScreen:', savedSettings);
        if (savedSettings) {
          const parsedSettings = JSON.parse(savedSettings);
          console.log('Parsed settings:', parsedSettings);
          setSettings(parsedSettings);
        }
      } catch (error) {
        console.log('Failed to load settings', error);
      }
    };
    loadSettings();
  }, []);

  /**
   * Generates a new question by:
   * 1. Filtering questions by category
   * 2. Removing already answered questions
   * 3. Selecting a random question
   *
   * 4. Setting up the question state
   */
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

  // Generate first question when component mounts
  useEffect(() => {
    generateQuestion();
  }, []);

  /**
   * Handles user's guess by:
   * 1. Checking if answer is correct
   * 2. Updating points and lives
   * 3. Playing appropriate sound effects
   * 4. Triggering vibration for incorrect answers
   * 5. Managing game state transitions
   */
  const handleGuess = (option: string) => {
    setSelectedOption(option);
    if (option === correctAnswer) {
      setPoints(points + 1);
      setHasAnswered(true);
      setShowAnswer(true);
      playSound('correct');
    } else {
      setShowAnswer(true);
      setGuessLeft(guessLeft - 1);
      setHasAnswered(true);
      playSound('incorrect');
      if (settings.vibration) {
        Vibration.vibrate(100);
      }
    }

    // Add current question to answered set
    setAnsweredQuestions(prev => new Set([...prev, currentWord]));

    if (guessLeft - 1 === 0) {
      navigation.navigate('ResultScreen', { points, category });
    }
  };

  /**
   * Prepares the game for the next question by:
   * 1. Resetting UI states
   * 2. Generating a new question
   */
  const handleNextQuestion = () => {
    setShowAnswer(false);
    setSelectedOption('');
    generateQuestion();
    setHasAnswered(false);
  };

  /**
   * Plays sound effects based on game events
   * @param soundType - Type of sound to play ('correct' or 'incorrect')
   */
  const playSound = async (soundType: 'correct' | 'incorrect') => {
    if (settings.soundEffects) {
      try {
        await Audio.setAudioModeAsync({
          playsInSilentModeIOS: true, // Play even when device is in silent mode (iOS)
          staysActiveInBackground: true, // Keep playing if app goes to background
          shouldDuckAndroid: false, // Don't reduce volume when other sounds play (Android)
        });

        // Load the appropriate sound file based on the event type
        const soundFile =
          soundType === 'correct'
            ? require('../assets/sounds/correct.mp3')
            : require('../assets/sounds/incorrect.mp3');

        // Create a new sound instance and prepare it for playback
        const { sound: newSound } = await Audio.Sound.createAsync(soundFile, {
          shouldPlay: true, // Start playing immediately after loading
        });

        await newSound.playAsync();

        // Set up cleanup after sound finishes playing
        newSound.setOnPlaybackStatusUpdate(async status => {
          if (status.isLoaded && status.didJustFinish) {
            // Unload the sound from memory to free up resources
            await newSound.unloadAsync();
          }
        });
      } catch (error) {
        console.log('Error playing sound:', error);
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <View style={styles.content}>
        <Text style={styles.categoryText}>{category}</Text>
        <GameStatus points={points} lives={guessLeft} />
        <WordCard word={currentWord} />
        <ScrollView
          style={styles.optionsScrollView}
          contentContainerStyle={styles.optionsContainer}
        >
          {options.map((option, index) => (
            <OptionButton
              key={index}
              option={option}
              isCorrect={option === correctAnswer}
              isSelected={option === selectedOption}
              showAnswer={showAnswer}
              onPress={() => handleGuess(option)}
              disabled={hasAnswered}
            />
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
