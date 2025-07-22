import { StyleSheet, View, Text, ScrollView, SafeAreaView } from "react-native";
import { useForm } from "react-hook-form";
import { useNavigation } from "@react-navigation/native";

import PalsText from "../components/PalsText";
import PalsTextInput from "../components/PalsTextInput";
import TouchableButton from "../components/PalsTouchableButton";
import Logo from "../components/Logo";
import { serverDomain } from "../constants/Config";

export default function AccountCreateScreen() {
  const navigation = useNavigation();
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "Hemant Mishra",
      mobile: "9131410942",
    },
  });

  const firstPin = watch("pin");

  const onRegisterPressed = async (data) => {
    await fetch(`${serverDomain}/api/auth/register`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...data, userType: "painter" }),
    })
      .then((response) => response.json())
      .then((responseData) => {
        if (responseData.status) {
          navigation.navigate("AccountVerifyScreen", {
            mobile: responseData?.data?.mobile,
          });
        }
      })
      .catch((error) => console.error(error));
  };

  const navigateToSignIn = () => {
    navigation.push("LoginScreen");
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.image}>
          <Logo bottom={40}></Logo>
        </View>
        <PalsText label="Create Account" type="h1"></PalsText>
        <PalsTextInput
          name="name"
          placeholder="Full name"
          control={control}
          rules={{ required: "Full name is required." }}
        />

        <PalsTextInput
          name="mobile"
          placeholder="Mobile"
          control={control}
          rules={{ required: "Mobile is required." }}
        />

        <View style={styles.continueBtn}>
          <TouchableButton
            label="Register"
            theme="filled"
            action={handleSubmit(onRegisterPressed)}
          ></TouchableButton>
        </View>

        <View style={styles.signInLine}>
          <Text>
            Already have an account?{" "}
            <Text style={styles.signIn} onPress={navigateToSignIn}>
              Sign in
            </Text>
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 40,
    // scrollbar-width: none;
  },
  scrollView: {
    marginHorizontal: 20,
  },
  image: {
    marginTop: 60,
  },
  continueBtn: { marginTop: 20 },
  signInLine: {
    alignSelf: "center",
    marginTop: 20,
    marginBottom: 30,
  },
  signIn: {
    fontWeight: "bold",
  },
});

// const styles = StyleSheet.create({
//   container: {
// flex: 1,
//     paddingHorizontal: 20,
//     paddingVertical: 40,
//     top: 100,
//   },
//   continueBtn: { marginTop: 20 },
//   signInLine: {
//     alignSelf: "center",
//     marginTop: 20,
//     marginBottom: 30,
//   },
//   signIn: {
//     fontWeight: "bold",
//   },
// });
