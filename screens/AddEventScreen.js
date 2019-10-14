import React from "react";
import { View, StyleSheet, Text, Switch, TextInput } from "react-native";
import { Input } from "react-native-elements";
import { connect } from "react-redux";

const AddEventScreen = props => {
  return (
    <View style={styles.screen}>
      <TextInput style={styles.inputContainer} placeholder="Title" />
      <View style={styles.switchContainer}>
        <Text style={styles.text}>All day</Text>
        <Switch />
      </View>
      <Text style={styles.text}>niedz. 13.10.2019</Text>
      {/* godzina */}
      <TextInput style={styles.inputContainer} placeholder="Localization" />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
    padding: 15
  },
  inputContainer: {
    borderBottomWidth: 1,
    width: "100%",
    paddingHorizontal: 10,
    paddingBottom: 10,
    fontSize: 18
  },
  switchContainer: {
    flexDirection: "row",
    width: "100%",
    marginVertical: 10,
    paddingHorizontal: 10,
    justifyContent: "space-between",
    alignItems: "center"
  },
  text: {
    fontSize: 18
  }
});

export default AddEventScreen;
