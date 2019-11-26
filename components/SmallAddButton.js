import React from "react";
import { TouchableOpacity, View, StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";

const AddButton = ({ navigation }) => {
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate({
          routeName: "AddCat"
        });
      }}
    >
      <View style={styles.button}>
        <Feather name="plus" size={40} color="#fff" />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    justifyContent: "center",
    alignItems: "center",
    height: 60,
    width: 60,
    borderRadius: 30,
    backgroundColor: "#f06e9c",
    marginBottom: 45
  }
});

export default AddButton;
