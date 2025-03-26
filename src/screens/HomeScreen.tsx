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
      <Text style={styles.title}>
        Välkommen till Förkortningsspelet detta är ett interaktivt
        frågesportspel designat för att testa och förbättra dina kunskaper om
        vanliga förkortningar. Utmana dig själv att gissa den fullständiga
        betydelsen av olika akronymer och förkortningar i olika kategorier!
      </Text>
      <View style={styles.buttonsContainer}>
        <Pressable onPress={() => navigation.navigate("GameScreen")}>
          <Text
            style={{
              color: "#000",
              backgroundColor: "#E6C229",
              padding: 10,
              textAlign: "center",
              borderRadius: 10,
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
    backgroundColor: "#F9F9F9",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    color: "#000",
    marginBottom: 20,
    textAlign: "center",
    padding: 10,
  },
  buttonsContainer: {
    backgroundColor: "#6883BA",
    flexDirection: "column",
    justifyContent: "space-around",
    width: "80%",
    gap: 20,
    marginTop: 20,
    padding: 10,
    borderRadius: 10,
  },
});
export default HomeScreen;
