import { Pressable, StyleSheet, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/types";

type NavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "HomeScreen"
>;

const HomeScreen = () => {
  let navigation = useNavigation<NavigationProp>();
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Välkommen till förkortningsspelet</Text>
      <View style={styles.buttonsContainer}>
        <Pressable onPress={() => navigation.navigate("GameScreen")}>
          <Text
            style={{
              color: "#fff",
              backgroundColor: "#841584",
              padding: 10,
              textAlign: "center",
            }}
          >
            Starta spelet
          </Text>
        </Pressable>
        <Pressable onPress={() => {}} />
        <Pressable onPress={() => {}} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#343d46",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#ffffff",
    marginBottom: 20,
    textAlign: "center",
  },
  buttonsContainer: {
    backgroundColor: "#a7adba",
    flexDirection: "column",
    justifyContent: "space-around",
    width: "80%",
    gap: 20,
    marginTop: 20,
    padding: 10,
  },
});
export default HomeScreen;
