import { Animated, StyleSheet } from 'react-native';

interface BonusTextProps {
  opacity: Animated.Value;
}

const BonusText = ({ opacity }: BonusTextProps) => {
  return <Animated.Text style={[styles.bonusText, { opacity }]}>+1 bonus point!</Animated.Text>;
};

export default BonusText;

const styles = StyleSheet.create({
  bonusText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFD700',
    position: 'absolute',
    top: 140,
    zIndex: 10,
    alignSelf: 'center',
    textShadowColor: '#000',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 4,
  },
});
