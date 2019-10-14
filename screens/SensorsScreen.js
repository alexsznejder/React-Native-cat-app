import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { SENSORS } from "../data/dummy-data";
import Sensor from "../components/Sensor";

const SensorsScreen = () => {
  const sensorsList = SENSORS.map(sen => (
    <Sensor key={sen.id.toString()} sensor={sen}>
      <Text style={styles.sensorValue}>Dirty</Text>
    </Sensor>
  ));

  return (
    <View style={styles.screen}>
      <ScrollView
        style={styles.list}
        contentContainerStyle={{ alignItems: "center" }}
      >
        {sensorsList}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 15
  },
  list: {
    width: "100%"
  },
  sensorValue: {
    fontSize: 24
  }
});

export default SensorsScreen;
