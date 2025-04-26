import { Pressable, StyleSheet, Text } from 'react-native';

interface OptionButtonProps {
  option: string;
  isCorrect: boolean;
  isSelected: boolean;
  showAnswer: boolean;
  onPress: () => void;
  disabled: boolean;
}

const OptionButton: React.FC<OptionButtonProps> = ({
  option,
  isCorrect,
  isSelected,
  showAnswer,
  onPress,
  disabled,
}) => {
  return (
    <Pressable
      style={[
        styles.optionButton,
        showAnswer &&
          isCorrect && {
            backgroundColor: 'lightgreen',
          },
        showAnswer && isSelected && !isCorrect && { backgroundColor: '#FF0000' },
      ]}
      onPress={onPress}
      disabled={disabled}
    >
      <Text style={styles.optionText}>{option}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
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
});

export default OptionButton;
