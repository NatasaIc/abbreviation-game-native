import { useEffect, useRef, useState } from 'react';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../constants/types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import abbreviations from '../data/abbreviations_with_categories.json';
import { Vibration } from 'react-native';
import { Audio } from 'expo-av';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Animated, Easing } from 'react-native';

const useGameLogic = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const route = useRoute<RouteProp<RootStackParamList, 'GameScreen'>>();
  const { category, restart } = route.params;

  const [currentWord, setCurrentWord] = useState('');
  const [options, setOptions] = useState<string[]>([]);
  const [points, setPoints] = useState<number>(0);
  const [answeredQuestions, setAnsweredQuestions] = useState<Set<string>>(new Set());

  const [correctAnswer, setCorrectAnswer] = useState('');
  const [selectedOption, setSelectedOption] = useState('');
  const [showAnswer, setShowAnswer] = useState(false);
  const [guessLeft, setGuessLeft] = useState(6);
  const [hasAnswered, setHasAnswered] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  const [questionStartTime, setQuestionStartTime] = useState(Date.now());

  const [settings, setSettings] = useState({
    soundEffects: true,
    vibration: true,
    fontSize: 'Medium',
    notification: true,
    username: '',
  });

  const bonusOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const loadSettings = async () => {
      try {
        const savedSettings = await AsyncStorage.getItem('userSettings');
        if (savedSettings) {
          const parsedSettings = JSON.parse(savedSettings);
          setSettings(parsedSettings);
        }
      } catch (error) {
        // Handle error silently
      }
    };
    loadSettings();
  }, []);

  useEffect(() => {
    if (route.params.restart) {
      resetGame();
      navigation.setParams({ restart: false });
    } else {
      generateQuestion();
    }
  }, [route.params.restart]);

  useEffect(() => {
    if (guessLeft === 0) {
      setIsGameOver(true);
      setIsGameOver(true);
      setTimeout(() => {
        setIsGameOver(false);
        navigation.navigate('ResultScreen', { points, category });
      }, 1500);
    }
  }, [guessLeft]);

  const triggerBonusAnimation = () => {
    bonusOpacity.setValue(0);

    Animated.sequence([
      Animated.timing(bonusOpacity, {
        toValue: 1,
        duration: 300,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }),
      Animated.delay(500),
      Animated.timing(bonusOpacity, {
        toValue: 0,
        duration: 300,
        easing: Easing.in(Easing.ease),
        useNativeDriver: true,
      }),
    ]).start();
  };

  const playSound = async (type: 'correct' | 'incorrect') => {
    if (!settings.soundEffects) return;

    try {
      const soundFile =
        type === 'correct'
          ? require('../assets/sounds/correct.mp3')
          : require('../assets/sounds/incorrect.mp3');

      await Audio.setAudioModeAsync({
        playsInSilentModeIOS: true,
      });

      const { sound } = await Audio.Sound.createAsync(soundFile);
      await sound.playAsync();

      sound.setOnPlaybackStatusUpdate(async status => {
        if (status.isLoaded && status.didJustFinish) {
          await sound.unloadAsync();
        }
      });
    } catch (error) {}
  };

  const resetGame = () => {
    setPoints(0);
    setGuessLeft(3);
    setAnsweredQuestions(new Set());
    setQuestionStartTime(Date.now());
    generateQuestion();
  };

  const generateQuestion = () => {
    setQuestionStartTime(Date.now());

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

  const handleGuess = (option: string) => {
    const timeTaken = Date.now() - questionStartTime;
    const isCorrect = option === correctAnswer;
    setSelectedOption(option);
    setHasAnswered(true);
    setShowAnswer(true);

    if (isCorrect) {
      let earndPoints = 1;
      if (timeTaken < 10000) {
        earndPoints += 1;
        triggerBonusAnimation();
      }
      setPoints(prev => prev + earndPoints);
      playSound('correct');
    } else {
      setGuessLeft(prev => prev - 1);
      playSound('incorrect');
      if (settings.vibration) {
        Vibration.vibrate(100);
      }
    }

    // Add current question to answered set
    setAnsweredQuestions(prev => new Set([...prev, currentWord]));
  };

  /**
   * Prepares the game for the next question by:
   * 1. Resetting UI states
   * 2. Generating a new question
   */
  const handleNextQuestion = () => {
    setShowAnswer(false);
    setSelectedOption('');
    setHasAnswered(false);
    generateQuestion();
  };

  const handleGameOverDismiss = () => {
    setIsGameOver(false);
    navigation.navigate('ResultScreen', { points, category });
  };

  return {
    category,
    currentWord,
    options,
    points,
    guessLeft,
    correctAnswer,
    selectedOption,
    showAnswer,
    hasAnswered,
    handleGuess,
    handleNextQuestion,
    bonusOpacity,
    isGameOver,
    handleGameOverDismiss,
  };
};

export default useGameLogic;
