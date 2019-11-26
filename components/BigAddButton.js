import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

const BigAddButton = ({ buttonText, handleOnPress }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={() => handleOnPress()}>
      <Text style={styles.buttonText}>{buttonText}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    fontWeight: "bold",
    backgroundColor: "#f06e9c",
    borderColor: "#e93578",
    borderWidth: 1,
    borderRadius: 30,
    paddingVertical: 6,
    width: "80%",
    elevation: 5,
    marginTop: 20,
    marginBottom: 40
  },
  buttonText: {
    fontSize: 24
  }
});

export default BigAddButton;
