import { useState } from "react";
import { StyleSheet, View } from "react-native";

import TouchableButton from "../components/PalsTouchableButton";
import BackButton from "../components/BackButton";
import UserHeader from "../components/UserHeader";
import PalsTextInput from "../components/PalsTextInput";

export default function UserAddCoupanScreen({ navigation }) {
  const [coupanCode, setCoupanCode] = useState({
    value: "",
    error: "",
  });

  const onAddPressed = () => {
    alert("Coupan added.");
  };

  const profilePressed = () => {
    navigation.push("UserProfileScreen");
  };

  return (
    <View style={styles.container}>
      <View>
        <UserHeader action={profilePressed}></UserHeader>
        <BackButton></BackButton>

        <PalsTextInput
          label="Coupan Code"
          value={coupanCode.value}
          onChangeText={(text) =>
            setCoupanCode({
              value: text,
              error: "",
            })
          }
          errorText={coupanCode.error}
        ></PalsTextInput>
      </View>
      <View style={styles.continueBtn}>
        <TouchableButton
          label="Add"
          theme="filled"
          action={onAddPressed}
        ></TouchableButton>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 40,
    justifyContent: "space-between",
  },
});
