import React, { useEffect, useState, useCallback } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import BackArrow from "../components/BackArrow";
import { getSensorsData } from "../api/sensors";
import SensorsList from "../components/SensorsList";

const SensorsScreen = () => {
  const [sensorsData, setSensorData] = useState([]);

  const loadSensorsData = useCallback(async () => {
    const response = await getSensorsData();
    setSensorData(response);
  }, []);

  useEffect(() => {
    loadSensorsData();
  }, [loadSensorsData]);

  return (
    <View style={styles.screen}>
      <ScrollView
        style={styles.list}
        contentContainerStyle={{ alignItems: "center" }}
      >
        <SensorsList sensors={sensorsData} />
      </ScrollView>
    </View>
  );
};

SensorsScreen.navigationOptions = props => ({
  headerLeft: <BackArrow navigation={props.navigation} />
});

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingTop: 15,
    paddingHorizontal: 15
  },
  list: {
    width: "100%"
  },
  sensorValue: {
    fontSize: 24
  }
});

export default SensorsScreen;
