import React, { useState } from "react";
import { View, Modal, Text, Button, StyleSheet } from "react-native";
import TouchableButton from "../components/PalsTouchableButton";

const UserRedeemModal = ({
  isVisible,
  redemmablePoints,
  confirmModal,
  closeModal,
}) => {
  return (
    <Modal animationType="slide" transparent={true} visible={isVisible}>
      <View style={styles.container}>
        <View style={styles.modal}>
          <Text style={styles.heading}>Redeemable Credits</Text>
          <Text style={styles.redeemablePoints}>{redemmablePoints || 0}</Text>
          <TouchableButton
            label="Confirm"
            theme="filled"
            onPress={confirmModal}
          ></TouchableButton>
          <TouchableButton
            label="Close"
            theme="light"
            onPress={closeModal}
          ></TouchableButton>
        </View>
      </View>
    </Modal>
  );
};

export default UserRedeemModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modal: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  heading: {
    alignSelf: "center",
    fontSize: 24,
  },
  redeemablePoints: {
    alignSelf: "center",
    fontWeight: "bold",
    fontSize: 36,
  },
});
