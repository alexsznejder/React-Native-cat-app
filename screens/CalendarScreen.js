import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { Calendar } from "react-native-calendars";
import { connect } from "react-redux";
import { addSelectedDate } from "../store/actions/dates";
import FloatingButton from "../components/FloatingButton";

const CalendarScreen = props => {
  const date = new Date().toLocaleDateString();

  const handleFloatingButtonPress = () => {
    props.navigation.navigate({
      routeName: "AddEvent"
    });
  };

  return (
    <View style={styles.screen}>
      <Calendar
        current={date}
        markedDates={props.dates.markedDates}
        firstDay={1}
        onDayPress={day => props.addSelectedDate(day.dateString)}
        theme={{
          selectedDayBackgroundColor: "pink"
        }}
      />
      <ScrollView></ScrollView>
      <FloatingButton onPress={handleFloatingButtonPress} />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1
  }
});

const mapStateToProps = state => ({
  dates: state.dates
});

const mapDispatchToProps = dispatch => ({
  addSelectedDate: dateString => dispatch(addSelectedDate(dateString))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CalendarScreen);
