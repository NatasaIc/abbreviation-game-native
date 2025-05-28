import React from 'react';
import {
  SafeAreaView,
  StatusBar,
  View,
  ScrollView,
  Pressable,
  Text,
  Animated,
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

const { height } = Dimensions.get('window');

const GameScreen = () => {
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
    marginTop: 30,
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
    width: '55%',
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
