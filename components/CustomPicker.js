import React from "react";
import { Picker, StyleSheet } from "react-native";

const CustomePicker = props => {
  const pickerItems = Object.keys(props.pickerValues).map(key => (
    <Picker.Item label={key} value={props.pickerValues[key]} key={key} />
  ));

  return (
    <Picker
      selectedValue={props.pickerValue}
      style={styles.picker}
      onValueChange={itemValue => props.setValue(itemValue)}
      itemStyle={styles.textStyle}
    >
      {pickerItems}
    </Picker>
  );
};

const styles = StyleSheet.create({
  picker: {
    width: "85%",
    marginVertical: 5
  },
  textStyle: {
    color: "black",
    fontSize: 18,
    fontWeight: "bold",
    backgroundColor: "red"
  }
});

export default CustomePicker;
