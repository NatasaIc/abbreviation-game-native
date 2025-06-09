import { StyleSheet, Text, View } from 'react-native';
import { GlobalStyles } from '../constants/styles';

interface WordCardProps {
  word: string;
}

const WordCard: React.FC<WordCardProps> = ({ word }) => {
  return (
    <View style={styles.wordCard}>
      <Text style={styles.currentWord}>{word}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  wordCard: {
    margin: 40,
    width: '60%',
    alignItems: 'center',
    borderWidth: 0.2,
    borderColor: GlobalStyles.colors.primary50,
    padding: 30,
    borderRadius: 10,
  },
  currentWord: {
    fontSize: 42,
    fontWeight: 'bold',
    color: GlobalStyles.colors.primary50,
    letterSpacing: 2,
  },
});

export default WordCard;
