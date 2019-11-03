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
      onValueChange={(itemValue, itemIndex) => props.setValue(itemValue)}
    >
      {pickerItems}
    </Picker>
  );
};

const styles = StyleSheet.create({
  picker: {
    width: "90%",
    marginVertical: 5
  }
});

export default CustomePicker;
