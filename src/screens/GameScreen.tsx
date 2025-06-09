/**
 * GameScreen Component
 * Main game interface where users play the abbreviation game
 * Handles displaying questions, options, and game state
 */
import React from 'react';
import {
  SafeAreaView,
  StatusBar,
  View,
  ScrollView,
  Pressable,
  Text,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import useGameLogic from '../hooks/useGameLogic';
import GameStatus from '../components/GameStatus';
import WordCard from '../components/WordCard';
import OptionButton from '../components/OptionButton';
import BonusText from '../components/BonusText';
import GameOverModal from '../components/GameOverModal';
import { GlobalStyles } from '../constants/styles';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../constants/types';

const { height } = Dimensions.get('window');

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'GameScreen'>;

const GameScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  // Get game logic and state from custom hook
  const {
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
  } = useGameLogic();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />

      <View style={styles.content}>
        <Text style={styles.categoryText}>{category}</Text>

        <GameStatus points={points} lives={guessLeft} />

        <WordCard word={currentWord} />

        <BonusText opacity={bonusOpacity} />

        <GameOverModal visible={isGameOver} onDismiss={handleGameOverDismiss} />

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
        {/* Next question button - only shown after answering */}
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
    alignItems: 'center',
    marginTop: height * 0.08,
  },
  optionsScrollView: {
    width: '100%',
  },
  optionsContainer: {
    width: '100%',
    gap: 12,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  nextButton: {
    width: '55%',
    marginTop: 10,
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
