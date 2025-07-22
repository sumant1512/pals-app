import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import TouchableButton from "../components/PalsTouchableButton";

const AdminProfileScreen = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.card}>
        <Image
          source={require("../assets/profile-placeholder.png")} // Add your placeholder image
          style={styles.profileImage}
        />

        <View style={styles.fieldContainer}>
          <Text style={styles.label}>FULL NAME</Text>
          <Text style={styles.value}>John Doe</Text>
        </View>

        <View style={styles.separator} />

        <View style={styles.fieldContainer}>
          <Text style={styles.label}>SHOP NAME</Text>
          <Text style={styles.value}>Doe's Supplies</Text>
        </View>

        <View style={styles.separator} />

        <View style={styles.fieldContainer}>
          <Text style={styles.label}>ADDRESS</Text>
          <Text style={styles.value}>123 Main St</Text>
        </View>

        <View style={styles.separator} />

        <View style={styles.row}>
          <View style={styles.halfField}>
            <Text style={styles.label}>CITY</Text>
            <Text style={styles.value}>Anytown</Text>
          </View>
          <View style={styles.halfField}>
            <Text style={styles.label}>STATE</Text>
            <Text style={styles.value}>California</Text>
          </View>
        </View>

        <View style={styles.separator} />

        <View style={styles.fieldContainer}>
          <Text style={styles.label}>MOBILE NUMBER</Text>
          <Text style={styles.value}>123-456-7890</Text>
        </View>

        {/* <TouchableOpacity style={styles.logoutButton}>
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity> */}
        <TouchableButton
          label="Log Out"
          theme="outlined"
          action={handleSubmit(onLogoutPressed)}
        ></TouchableButton>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#f9f9f9",
    justifyContent: "center",
    padding: 16,
  },
  card: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    elevation: 4,
  },
  profileImage: {
    width: 100,
    height: 100,
    alignSelf: "center",
    marginBottom: 20,
    borderRadius: 50,
  },
  fieldContainer: {
    marginBottom: 10,
  },
  label: {
    fontSize: 12,
    color: "#999",
    marginBottom: 4,
  },
  value: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000",
  },
  separator: {
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    marginVertical: 10,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  halfField: {
    width: "48%",
  },
  logoutButton: {
    marginTop: 30,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: "center",
  },
  logoutText: {
    color: "#000",
    fontWeight: "600",
    fontSize: 16,
  },
});

export default AdminProfileScreen;
