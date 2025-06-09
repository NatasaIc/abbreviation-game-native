import { Modal, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';
import { GlobalStyles } from '../constants/styles';

interface GameOverModalProps {
  visible: boolean;
  onDismiss: () => void;
}

const GameOverModal = ({ visible, onDismiss }: GameOverModalProps) => {
  return (
    <Modal visible={visible} transparent animationType="fade">
      <TouchableWithoutFeedback onPress={onDismiss}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Game Over 💀</Text>
            <Text style={styles.modalSubtitle}>No more lives left!</Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default GameOverModal;

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 100,
  },
  modalContent: {
    backgroundColor: GlobalStyles.colors.primary500,
    padding: 30,
    borderRadius: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 10,
  },

  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#D00000',
    marginBottom: 10,
  },

  modalSubtitle: {
    fontSize: 16,
    color: GlobalStyles.colors.text500,
  },
});
