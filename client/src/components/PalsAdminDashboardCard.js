import React from "react";
import { Text, StyleSheet, TouchableOpacity, Dimensions } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const PalsAdminDashboardCard = ({ label, icon, onPress }) => {
  const screenWidth = Dimensions.get("window").width;
  const boxSize = screenWidth * 0.27;

  const dynamicStyles = StyleSheet.create({
    card: {
      backgroundColor: "#F5F5F5",
      borderRadius: 12,
      alignItems: "center",
      justifyContent: "center",
      shadowColor: "#000",
      shadowOpacity: 0.1,
      shadowOffset: { width: 0, height: 2 },
      shadowRadius: 4,
      elevation: 3,
      width: boxSize,
      height: boxSize,
      padding: 10,
    },
    text: {
      marginTop: 10,
      fontSize: 12,
      color: "#00206F",
      fontWeight: "600",
      textAlign: "center",
    },
  });

  return (
    <TouchableOpacity style={dynamicStyles.card} onPress={onPress}>
      <Ionicons name={icon} size={24} color="#00206F" />
      <Text style={dynamicStyles.text}>{label}</Text>
    </TouchableOpacity>
  );
};

export default PalsAdminDashboardCard;
