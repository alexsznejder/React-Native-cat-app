import React from "react";
import { View, Text, StyleSheet } from "react-native";

const CatDataItem = props => {
  return (
    <View style={styles.item}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{props.title}</Text>
      </View>
      <View style={styles.dataContainer}>
        <Text style={styles.data}>{props.data}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    width: 140,
    height: 140,
    borderRadius: 10,
    elevation: 5,
    backgroundColor: "white",
    padding: 10,
    marginVertical: 15
  },
  titleContainer: {
    width: "100%",
    alignItems: "center"
  },
  title: {
    fontWeight: "bold",
    fontSize: 20
  },
  dataContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  data: {
    fontSize: 16
  }
});

export default CatDataItem;
