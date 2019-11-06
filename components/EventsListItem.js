import React from "react";
import { View, Text, StyleSheet } from "react-native";

const EventsListItem = props => {
  const currentHour = new Date().getHours();
  const currentMinute = new Date().getMinutes();
  const date = new Date();
  const currentDate = `${date.getFullYear()}-${
    date.getMonth() < 9 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1
  }-${date.getDate() < 10 ? "0" + date.getDate() : date.getDate()}`;
  const active = () => {
    if (props.selectedDay >= currentDate) {
      if (
        currentHour < props.time.slice(0, 2) ||
        (currentHour == props.time.slice(0, 2) &&
          currentMinute < props.time.slice(3))
      )
        return true;
    } else return false;
  };

  return (
    <View style={styles.container}>
      <View
        style={
          active()
            ? { ...styles.active, ...styles.dot }
            : { ...styles.inactive, ...styles.dot }
        }
      ></View>
      <View style={styles.textContainer}>
        <Text style={styles.text}>{props.title}</Text>
        <Text style={styles.time}>{props.time}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    height: 60
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    elevation: 5,
    marginRight: 20
  },
  active: {
    backgroundColor: "blue"
  },
  inactive: {
    backgroundColor: "gray"
  },
  textContainer: {
    flex: 1,
    height: "100%",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 0.5,
    borderColor: "lightgray"
  },
  text: {},
  time: {}
});

export default EventsListItem;
