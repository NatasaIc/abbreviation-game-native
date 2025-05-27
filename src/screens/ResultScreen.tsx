import { Pressable, StyleSheet, Text, View } from 'react-native';
import { RouteProp, useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { RootStackParamList } from '../constants/types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { GlobalStyles } from '../constants/styles';

type ResultScreenProp = RouteProp<RootStackParamList, 'ResultScreen'>;
type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

type Props = {
  route: ResultScreenProp;
};

const ResultScreen = ({ route }: Props) => {
  const navigation = useNavigation<NavigationProp>();
  const { points, category } = route.params;

  const percentages = Math.round((points / 10) * 100);

  const performanceMessage = () => {
    if (points > 7) {
      return 'You are legend!👑';
    } else if (points >= 4) {
      return 'Good job!💪';
    } else {
      return 'Try again!😅';
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.pointsText}>You got {points} points!🎉</Text>
      <Text style={styles.pointsText}>{percentages}% of the maximum points!</Text>
      <Text style={styles.pointsText}>{performanceMessage()}</Text>
      <Pressable
        style={styles.newGameButton}
        onPress={() => navigation.navigate('GameScreen', { category })}
      >
        <Text style={styles.newGameButtonText}>Play again!</Text>
      </Pressable>
      <Pressable style={styles.newGameButton} onPress={() => navigation.navigate('HomeScreen')}>
        <Text style={styles.newGameButtonText}>Exit</Text>
      </Pressable>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: GlobalStyles.colors.primary500,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  pointsText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 20,
  },
  newGameButton: {
    backgroundColor: GlobalStyles.colors.accent500,
    padding: 15,
    borderRadius: 10,
    width: '60%',
    margin: 10,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 4,
  },
  newGameButtonText: {
    color: GlobalStyles.colors.primary500,
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ResultScreen;
