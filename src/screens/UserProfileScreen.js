import { StyleSheet, View } from "react-native";

import UserHeader from "../components/UserHeader";
import BackButton from "../components/BackButton";

export default function UserProfileScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <UserHeader></UserHeader>
      <BackButton></BackButton>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
});
