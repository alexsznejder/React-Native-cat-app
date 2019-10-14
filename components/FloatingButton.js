import React from "react";
import { TouchableOpacity, Icon, StyleSheet } from "react-native";
import { AntDesign } from "@expo/vector-icons";

const FloatingButton = props => {
  return (
    <TouchableOpacity style={styles.button} onPress={() => props.onPress()}>
      <AntDesign name="plus" size={25} color="black" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    position: "absolute",
    bottom: 25,
    right: 25,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "white",
    elevation: 3,
    justifyContent: "center",
    alignItems: "center"
  }
});

export default FloatingButton;
