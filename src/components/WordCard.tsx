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
});

export default WordCard;
