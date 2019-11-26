import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import MainButton from "./MainButton";

const Sensor = props => {
  const { sensor } = props;
  return (
    <View style={styles.sensorContainer}>
      {/* <View style={styles.activeStatus}>
        <View
          style={
            sensor.active
              ? { ...styles.active, ...styles.dot }
              : { ...styles.inactive, ...styles.dot }
          }
        ></View>
        <Text>{sensor.active ? "ACTIVE" : "INACTIVE"}</Text>
      </View> */}
      <View style={styles.theRest}>
        <Text style={styles.name}>
          {String(sensor.name)
            .charAt(0)
            .toUpperCase() +
            String(sensor.name)
              .slice(1)
              .toLowerCase()}
        </Text>
        <View style={styles.valueContainer}>
          <Text>{sensor.value}</Text>
        </View>
        <View style={styles.resetButton}>
          <MainButton>
            <Text>reset</Text>
          </MainButton>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  sensorContainer: {
    width: "95%",
    height: 200,
    borderRadius: 10,
    elevation: 5,
    backgroundColor: "white",
    marginTop: 5,
    marginBottom: 15,
    padding: 10
  },
  activeStatus: {
    flexDirection: "row",
    alignItems: "center"
  },
  dot: {
    width: 14,
    height: 14,
    borderRadius: 7,
    elevation: 5,
    marginRight: 10
  },
  active: {
    backgroundColor: "green"
  },
  inactive: {
    backgroundColor: "red"
  },
  resetButton: {
    marginBottom: 5
  },
  theRest: {
    alignItems: "center",
    flex: 1,
    marginTop: 10
  },
  name: {
    fontSize: 20
  },
  valueContainer: {
    flex: 1,
    justifyContent: "center"
  }
});

export default Sensor;
