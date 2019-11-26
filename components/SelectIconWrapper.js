import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";

const SelectItemWrapper = ({ children }) => {
  return (
    <TouchableOpacity style={styles.container}>{children}</TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10
  }
});

export default SelectItemWrapper;
