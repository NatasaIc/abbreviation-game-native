import {
  Pressable,
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Dimensions,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../constants/types";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { useEffect, useState } from "react";
import abbreviations_with_categories from "../data/abbreviations_with_categories.json";
import { GlobalStyles } from "../constants/styles";

type NavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "CategoryScreen"
>;

const CategoryScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const [category, setCategory] = useState<string[]>([]);

  const getCategories = () => {
    const selected = [
      ...new Set(abbreviations_with_categories.map((item) => item.category)),
    ];

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
          <Text style={styles.subtitle}>
            Select a category or master them all
          </Text>
        </View>
        <ScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          <View style={styles.bentoGrid}>
            {category.map((item) => (
              <Pressable
                style={styles.bentoItem}
                key={item}
                onPress={() =>
                  navigation.navigate("GameScreen", { category: item })
                }
              >
                <LinearGradient
                  colors={["#E6C229", "#F7D154"]}
                  style={styles.itemGradient}
                >
                  <View style={styles.itemContent}>
                    <Text style={styles.categoryEmoji}>
                      {getCategoryEmoji(item)}
                    </Text>
                    <Text style={styles.buttonText}>{item}</Text>
                    <Text style={styles.itemCount}>
                      {getCategoryCount(item)} terms
                    </Text>
                  </View>
                </LinearGradient>
              </Pressable>
            ))}
            <Pressable
              style={styles.bentoItem}
              onPress={() =>
                navigation.navigate("GameScreen", { category: "all" })
              }
            >
              <LinearGradient
                colors={["#FF9B42", "#FFB067"]}
                style={styles.itemGradient}
              >
                <View style={styles.itemContent}>
                  <Text style={styles.categoryEmoji}>🌟</Text>
                  <Text style={styles.buttonText}>All Categories</Text>
                  <Text style={styles.itemCount}>
                    {abbreviations_with_categories.length} terms
                  </Text>
                </View>
              </LinearGradient>
            </Pressable>
          </View>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
};

// Helper function to get emoji for categories
const getCategoryEmoji = (category: string) => {
  const emojiMap: { [Key: string]: string } = {
    Medical: "⚕️",
    Technology: "💻",
    Business: "💼",
    Science: "🔬",
    Education: "📚",
  };
  return emojiMap[category] || "📋";
};
// Helper function to count items in category
const getCategoryCount = (category: string) => {
  return abbreviations_with_categories.filter(
    (item) => item.category === category
  ).length;
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
    alignItems: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#FFF",
    textAlign: "center",
    marginBottom: 8,
    textShadowColor: "rgba(0,0,0,0.2)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  subtitle: {
    fontSize: 14,
    color: "#FFF",
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
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 12,
    padding: 12,
  },
  bentoItem: {
    width: Dimensions.get("window").width * 0.38,
    aspectRatio: 1,
    borderRadius: 16,
    overflow: "hidden",
    elevation: 5,
    shadowColor: "#000",
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
    alignItems: "center",
    justifyContent: "center",
  },
  categoryEmoji: {
    fontSize: 32,
    marginBottom: 8,
  },
  buttonText: {
    color: "#000",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 4,
  },
  itemCount: {
    fontSize: 12,
    color: "#000",
    opacity: 0.7,
  },
});

export default CategoryScreen;
