import React from "react";
import { StyleSheet } from "react-native";
import { Input } from "react-native-elements";

const CustomFormInput = props => {
  return (
    <Input
      label={props.label}
      placeholder={props.placeholder}
      labelStyle={styles.labelStyle}
      inputContainerStyle={
        props.large ? styles.largeInputStyle : styles.inputContainerStyle
      }
      containerStyle={styles.containerStyle}
      value={props.value}
      onChangeText={props.valueChange}
      numberOfLines={props.large ? 2 : 1}
      inputStyle={props.large ? { textAlignVertical: "top" } : null}
      multiline={props.large ? true : false}
    />
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center"
  },
  containerStyle: {
    width: "85%",
    marginVertical: 5
  },
  inputContainerStyle: {
    borderWidth: 1,
    borderRadius: 30,
    borderColor: "black",
    marginVertical: 7,
    backgroundColor: "white",
    paddingHorizontal: 20,
    elevation: 5
  },
  largeInputStyle: {
    borderWidth: 1,
    borderRadius: 30,
    borderColor: "black",
    marginVertical: 7,
    backgroundColor: "white",
    paddingHorizontal: 20,
    elevation: 5,
    height: 75
  },
  labelStyle: {
    color: "black",
    fontSize: 18
  }
});

export default CustomFormInput;
