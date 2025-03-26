import { RouteProp, useNavigation } from "@react-navigation/native";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { RootStackParamList } from "../navigation/types";

type ResultScreenProp = RouteProp<RootStackParamList, "ResultScreen">;

type Props = {
  route: ResultScreenProp;
  navigation: any;
};

const ResultScreen = ({ route }: Props) => {
  const { points } = route.params;
  return (
    <SafeAreaView>
      <Text>Du fick {points} poäng!🎉</Text>
    </SafeAreaView>
  );
};

export default ResultScreen;
