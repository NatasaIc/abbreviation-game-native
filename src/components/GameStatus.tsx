import { StyleSheet, Text, View } from 'react-native';

const GameStatus = ({ points, lives }: { points: number; lives: number }) => (
  <View style={styles.statusContainer}>
    <View style={styles.statBox}>
      <Text style={styles.statLable}>Points</Text>
      <Text style={styles.statValue}>{points}</Text>
    </View>
    <View style={styles.statBox}>
      <Text style={styles.statLable}>Lives</Text>
      <Text style={styles.statValue}>{lives}</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
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
});

export default GameStatus;
