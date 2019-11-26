import React, { useEffect, useCallback } from "react";
import { View, StyleSheet, ScrollView, ToastAndroid, Text } from "react-native";
import { Calendar } from "react-native-calendars";
import { connect } from "react-redux";
import { addSelectedDate, fetchEvents } from "../store/actions/dates";
import FloatingButton from "../components/FloatingButton";
import EventModal from "../components/EventModal";
import EventsListItem from "../components/EventsListItem";
import BackArrow from "../components/BackArrow";

const CalendarScreen = ({
  dates,
  fetchEvents,
  addSelectedDate,
  navigation,
  cats
}) => {
  const selectedEvents = dates.selectedDayEvents
    .filter(event => event.catId == cats.selectedCatId)
    .map(event => (
      <EventsListItem
        key={event.id}
        event={event}
        time={event.time}
        title={event.title}
        selectedDay={dates.selectedDay}
        navigation={navigation}
      />
    ));

  const loadEvents = useCallback(async () => {
    await fetchEvents();
    // setSelectedEventId(undefined);
  }, []);

  useEffect(() => {
    loadEvents();
  }, [loadEvents]);

  return (
    <View style={styles.screen}>
      <Calendar
        current={dates.selectedDay}
        markedDates={dates.markedDates}
        firstDay={1}
        onDayPress={day => {
          addSelectedDate(day.dateString);
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
          if (dates.selectedDay == "") {
            ToastAndroid.show("First select a day!", ToastAndroid.SHORT);
          } else {
            navigation.navigate("AddEvent");
          }
        }}
      />
    </View>
  );
};

CalendarScreen.navigationOptions = props => ({
  headerLeft: <BackArrow navigation={props.navigation} />
});

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center"
  },
  eventsContainer: {
    marginTop: 10,
    backgroundColor: "white",
    height: "100%"
  },
  todayText: {
    margin: 10
  }
});

const mapStateToProps = state => ({
  dates: state.dates,
  cats: state.cats
});

const mapDispatchToProps = dispatch => ({
  addSelectedDate: dateString => dispatch(addSelectedDate(dateString)),
  fetchEvents: () => dispatch(fetchEvents())
});

export default connect(mapStateToProps, mapDispatchToProps)(CalendarScreen);
