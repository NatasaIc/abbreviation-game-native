import { LinearGradient } from 'expo-linear-gradient';
import { Dimensions, Pressable, StyleSheet, View, Text } from 'react-native';
import { GlobalStyles } from '../constants/styles';

interface CategoryCardProps {
  category: string;
  count: number;
  onPress: () => void;
  isAllCategories?: boolean;
}

const CategoryCard = ({ category, count, onPress, isAllCategories = false }: CategoryCardProps) => {
  return (
    <Pressable onPress={onPress} style={styles.bentoItem}>
      <LinearGradient
        colors={isAllCategories ? ['#FF9B42', '#FFB067'] : ['#E6C229', '#F7D154']}
        style={styles.itemGradient}
      >
        <View style={styles.itemContent}>
          <Text style={styles.categoryEmoji}>
            {isAllCategories ? '🌟' : getCategoryEmoji(category)}
          </Text>
          <Text style={styles.buttonText}>{isAllCategories ? 'All Categories' : category}</Text>
          <Text style={styles.itemCount}>{count} terms</Text>
        </View>
      </LinearGradient>
    </Pressable>
  );
};

// Helper function to get emoji for categories
const getCategoryEmoji = (category: string) => {
  const emojiMap: { [Key: string]: string } = {
    Medical: '⚕️',
    Technology: '💻',
    Business: '💼',
    Science: '🧪',
    Education: '📚',
  };
  return emojiMap[category] || '📋';
};

const styles = StyleSheet.create({
  bentoItem: {
    width: Dimensions.get('window').width * 0.38,
    aspectRatio: 1,
    borderRadius: 16,
    overflow: 'hidden',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    margin: 4,
  },
  itemGradient: {
    flex: 1,
    padding: 12,
  },
  itemContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  categoryEmoji: {
    fontSize: 32,
    marginBottom: 8,
  },
  buttonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 4,
  },
  itemCount: {
    fontSize: 12,
    color: '#000',
    opacity: 0.7,
  },
});

export default CategoryCard;
