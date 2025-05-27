import { StyleSheet, Text, View, ScrollView, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../constants/types';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { useEffect, useState } from 'react';
import abbreviations_with_categories from '../data/abbreviations_with_categories.json';
import { GlobalStyles } from '../constants/styles';
import CategoryCard from '../components/CategoryCard';
import IconButton from '../UI/IconButton';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'CategoryScreen'>;

const CategoryScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const [category, setCategory] = useState<string[]>([]);

  const getCategories = () => {
    const selected = [...new Set(abbreviations_with_categories.map(item => item.category))];

    setCategory(selected);
  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <LinearGradient
      colors={[GlobalStyles.colors.primary500, GlobalStyles.colors.primary400]}
      style={styles.container}
    >
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <Text style={styles.title}>Choose Your Challenge</Text>
          <Text style={styles.subtitle}>Select a category or master them all</Text>
        </View>
        <ScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          <View style={styles.bentoGrid}>
            {category.map(item => (
              <CategoryCard
                key={item}
                category={item}
                count={getCategoryCount(item)}
                onPress={() => navigation.navigate('GameScreen', { category: item })}
              ></CategoryCard>
            ))}
            <CategoryCard
              category="all"
              count={abbreviations_with_categories.length}
              onPress={() => navigation.navigate('GameScreen', { category: 'all' })}
              isAllCategories
            ></CategoryCard>
          </View>
          <View style={styles.backButtonContainer}>
            <IconButton
              icon="arrow-back"
              size={24}
              color="white"
              onPress={() => navigation.goBack()}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
};

// Helper function to count items in category
const getCategoryCount = (category: string) => {
  return abbreviations_with_categories.filter(item => item.category === category).length;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
  },
  safeArea: {
    flex: 1,
  },
  header: {
    padding: 16,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFF',
    textAlign: 'center',
    marginBottom: 8,
    textShadowColor: 'rgba(0,0,0,0.2)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  subtitle: {
    fontSize: 14,
    color: '#FFF',
    opacity: 0.9,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  bentoGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 12,
    padding: 12,
  },
  backButtonContainer: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 10,
  },
});

export default CategoryScreen;
