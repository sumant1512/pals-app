import React from "react";
import { Text } from "react-native";

export default function PalsText({ label, type }) {
  return <Text style={[fontSize(type)]}>{label}</Text>;
}

function fontSize(type) {
  switch (type) {
    case "h1":
      return {
        fontWeight: "500",
        marginBottom: 20,
        fontSize: 30,
      };
    case "h2":
      return {
        fontWeight: "500",
        marginBottom: 20,
        fontSize: 40,
      };
    case "p1":
      return {
        marginBottom: 10,
        fontSize: 16,
      };
    case "p2":
      return {
        marginBottom: 10,
        fontSize: 20,
      };
    case "p3":
      return {
        marginBottom: 16,
        fontSize: 22,
      };
    case "p4":
      return {
        marginBottom: 16,
        fontSize: 30,
      };
    default:
      return {
        fontWeight: "500",
        marginBottom: 20,
        fontSize: 30,
      };
  }
}
