import React, { useState, useEffect, useCallback } from "react";
import { View, StyleSheet, ScrollView, ToastAndroid, Text } from "react-native";
import { Calendar } from "react-native-calendars";
import { connect } from "react-redux";
import { addSelectedDate, addEvent, fetchEvents } from "../store/actions/dates";
import FloatingButton from "../components/FloatingButton";
import EventModal from "../components/EventModal";
import EventsListItem from "../components/EventsListItem";

const CalendarScreen = props => {
  const [modalVisible, setModalVisible] = useState(false);

  const selectedEvents = props.dates.selectedDayEvents.map(event => (
    <EventsListItem
      key={event.id}
      time={event.time}
      title={event.title}
      selectedDay={props.dates.selectedDay}
    />
  ));

  const loadEvents = useCallback(async () => {
    await props.fetchEvents();
  }, []);

  useEffect(() => {
    loadEvents();
  }, [loadEvents]);

  return (
    <View style={styles.screen}>
      <Calendar
        current={props.dates.selectedDay}
        markedDates={props.dates.markedDates}
        firstDay={1}
        onDayPress={day => {
          props.addSelectedDate(day.dateString);
        }}
        theme={{
          selectedDayBackgroundColor: "pink"
        }}
      />
      <ScrollView style={styles.eventsContainer}>
        <Text style={styles.todayText}>Today</Text>
        {selectedEvents}
      </ScrollView>
      <FloatingButton
        onPress={() => {
          if (props.dates.selectedDay == "") {
            ToastAndroid.show("First select a day!", ToastAndroid.SHORT);
          } else {
            setModalVisible(true);
          }
        }}
      />

      <EventModal
        selectedDay={props.dates.selectedDay}
        modalVis={modalVisible}
        handleCancelPress={() => setModalVisible(false)}
        handleSavePress={(title, allDay, time, localization, description) => {
          props.addEvent(
            props.dates.selectedDay,
            title,
            allDay,
            time,
            localization,
            description
          );
          setModalVisible(false);
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center"
  },
  eventsContainer: {
    marginTop: 10,
    backgroundColor: "white"
  },
  todayText: {
    margin: 10
  }
});

const mapStateToProps = state => ({
  dates: state.dates
});

const mapDispatchToProps = dispatch => ({
  addSelectedDate: dateString => dispatch(addSelectedDate(dateString)),
  addEvent: (date, title, allDay, time, localization, description) =>
    dispatch(addEvent(date, title, allDay, time, localization, description)),
  fetchEvents: () => dispatch(fetchEvents())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CalendarScreen);
