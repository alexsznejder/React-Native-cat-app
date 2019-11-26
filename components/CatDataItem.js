import React from "react";
import { View, Text, StyleSheet } from "react-native";
import moment from "moment";

const CatDataItem = ({ title, data }) => {
  const dataTransform = () => {
    if (title === "Birthday") {
      let dateToDisplay = moment(data, "DD-MM-YYYY").format("DD MMM YYYY");
      return dateToDisplay;
    } else if (title === "Breed") {
      return (
        String(data)
          .charAt(0)
          .toUpperCase() +
        String(data)
          .slice(1)
          .toLowerCase()
      );
    } else if (title === "Weight") {
      return data + " kg";
    } else {
      return data ? "Yes" : "No";
    }
  };

  return (
    <View style={styles.item}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{title}</Text>
      </View>
      <View style={styles.dataContainer}>
        <Text style={styles.data}>{dataTransform()}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    width: 140,
    height: "42%",
    borderRadius: 10,
    justifyContent: "space-between",
    elevation: 5,
    backgroundColor: "white",
    padding: 10,
    marginVertical: 10
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
    fontSize: 20,
    textAlign: "center"
  }
});

export default CatDataItem;
