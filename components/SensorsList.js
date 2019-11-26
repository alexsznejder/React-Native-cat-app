import React, { useEffect, useState, useCallback } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import Sensor from "../components/Sensor";

const SensorsList = ({ sensors }) => {
  const mappedSensors = sensors.map(sensor => (
    <Sensor key={sensor.name} sensor={sensor} />
  ));

  return <>{mappedSensors}</>;
};

export default SensorsList;
