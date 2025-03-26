import { Pressable, StyleSheet, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/types";
import { SafeAreaView } from "react-native-safe-area-context";

type NavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "HomeScreen"
>;

const HomeScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>
        Utmana dig själv att gissa den fullständiga betydelsen av olika
        akronymer och förkortningar i olika kategorier!
      </Text>
      <View style={styles.buttonsContainer}>
        <Pressable
          style={styles.buttons}
          onPress={() => navigation.navigate("GameScreen")}
        >
          <Text style={styles.buttonText}>Starta spelet</Text>
        </Pressable>
      </View>
    </SafeAreaView>
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
    justifyContent: "center",
    width: "80%",
    gap: 20,
    marginTop: 20,
    padding: 10,
    borderRadius: 10,
  },
  buttons: {
    alignItems: "center",
    padding: 10,
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
