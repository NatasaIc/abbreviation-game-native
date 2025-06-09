import { Pressable, StyleSheet, Text, View, StatusBar, Dimensions, Animated } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../constants/types';
import { SafeAreaView } from 'react-native-safe-area-context';
import { GlobalStyles } from '../constants/styles';
import BouncingButton from '../components/BouncingButton';

const { height, width } = Dimensions.get('window');

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'HomeScreen'>;

const HomeScreen = () => {
  const navigation = useNavigation<NavigationProp>();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />

      <SafeAreaView style={styles.content}>
        <View>
          <Text style={styles.title}>Abbreviation{'\n'}Challange</Text>
          <Text style={styles.subtitle}>Test your knowledge of acronyms and abbreviations!</Text>
        </View>

        <View>
          <BouncingButton
            onPress={() => navigation.navigate('CategoryScreen', { category: 'all' })}
          >
            Start Game
          </BouncingButton>
        </View>
      </SafeAreaView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: GlobalStyles.colors.primary500,
  },
  content: {
    marginTop: height * 0.1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  header: {
    alignItems: 'center',
    marginTop: height * 0.1,
  },
  title: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#FFF',
    textAlign: 'center',
    marginBottom: 16,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 5,
  },
  subtitle: {
    fontSize: 18,
    color: '#FFF',
    textAlign: 'center',
    opacity: 0.9,
    maxWidth: width * 0.8,
    lineHeight: 28,
    marginBottom: height * 0.08,
  },
});
export default HomeScreen;
