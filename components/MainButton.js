import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

const MainButton = props => {
  return (
    <TouchableOpacity activeOpacity={0.6} onPress={() => {}}>
      <View style={styles.button}>
        <Text style={styles.buttonText}>{props.children}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderWidth: 2,
    borderColor: "black",
    borderRadius: 5,
    paddingHorizontal: 24,
    paddingVertical: 10
    // overflow: "hidden"
  },
  buttonText: {
    textTransform: "uppercase",
    fontWeight: "bold"
  }
});

export default MainButton;
