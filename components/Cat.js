import React from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";

const Cat = props => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={props.onSelectCat}>
        <View style={styles.image}></View>
        <Text style={styles.text}>{props.name}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    padding: 15
  },
  image: {
    height: 200,
    width: 200,
    backgroundColor: "#ccc",
    borderColor: "black",
    borderWidth: 3,
    borderRadius: 100,
    overflow: "hidden",
    elevation: 5
  },
  text: {
    textAlign: "center",
    marginVertical: 10,
    fontSize: 30,
    fontWeight: "bold"
    // fontWeight: "bold"
  }
});

export default Cat;
