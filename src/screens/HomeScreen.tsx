import {
  Pressable,
  StyleSheet,
  Text,
  View,
  ImageBackground,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/types";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import Svg, { Circle } from "react-native-svg";

type NavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "HomeScreen"
>;

const HomeScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  return (
    <ImageBackground
      source={require("../assets/images/ruins.png")}
      style={styles.container}
    >
      <LinearGradient
        colors={["rgba(104, 131, 186, 0.5)", "rgba(230, 194, 41, 0.5)"]}
        style={styles.gradient}
      >
        <SafeAreaView style={styles.content}>
          <View style={styles.shapes}>
            <Svg height="100" width="100" style={styles.shape1}>
              <Circle cx="50" cy="50" r="40" fill="#E6C229" opacity="0.7" />
            </Svg>
            <Svg height="80" width="80" style={styles.shape2}>
              <Circle cx="40" cy="40" r="30" fill="#6883BA" opacity="0.7" />
            </Svg>
          </View>
          <Text style={styles.title}>Abbreviation{"\n"}Challange</Text>
          <Text style={styles.subtitle}>
            Test your knowledge of acronyms and abbreviations!
          </Text>
          <View style={styles.buttonsContainer}>
            <Pressable
              style={styles.buttons}
              onPress={() =>
                navigation.navigate("CategoryScreen", { category: "all" })
              }
            >
              <LinearGradient
                colors={["#E6C229", "#F7D154"]}
                style={styles.buttonGradient}
              >
                <Text style={styles.buttonText}>Start Game</Text>
              </LinearGradient>
            </Pressable>
          </View>
        </SafeAreaView>
      </LinearGradient>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
  },
  shapes: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 0,
  },
  shape1: {
    position: "absolute",
    top: 60,
    right: 30,
    transform: [{ rotate: "45deg" }],
  },
  shape2: {
    position: "absolute",
    bottom: 60,
    left: 30,
    transform: [{ rotate: "-15deg" }],
  },
  title: {
    fontSize: 42,
    fontWeight: "bold",
    color: "#FFF",
    marginBottom: 20,
    textAlign: "center",
    textShadowColor: "rgba(0, 0, 0, 0.3)",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 5,
  },
  subtitle: {
    fontSize: 18,
    color: "#FFF",
    textAlign: "center",
    marginBottom: 40,
    opacity: 20,
  },
  buttonsContainer: {
    width: "80%",
    marginTop: 20,
  },
  buttons: {
    overflow: "hidden",
    borderRadius: 25,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  buttonGradient: {
    paddingVertical: 15,
    paddingHorizontal: 30,
    alignItems: "center",
    borderRadius: 25,
  },
  buttonText: {
    color: "#000",
    backgroundColor: "#E6C229",
    paddingHorizontal: 30,
    paddingVertical: 15,
    textAlign: "center",
    borderRadius: 10,
    fontWeight: "bold",
  },
});
export default HomeScreen;
