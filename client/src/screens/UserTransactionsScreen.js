import { StyleSheet, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import PalsText from "../components/PalsText";
import UserHeader from "../components/UserHeader";
import BackButton from "../components/BackButton";

export default function UserTransactionsScreen() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <UserHeader></UserHeader>
      <BackButton></BackButton>
      <View style={styles.body}>
        <PalsText label={"Coming soon"} type={"h2"}></PalsText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  body: {
    alignSelf: "center",
  },
});
