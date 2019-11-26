import React, { useState } from "react";
import {
  View,
  Text,
  ToastAndroid,
  KeyboardAvoidingView,
  TouchableOpacity,
  StyleSheet,
  Switch
} from "react-native";
import moment from "moment";
import CustomFormInput from "../components/CustomFormInput";
import { connect } from "react-redux";
import BigAddButton from "../components/BigAddButton";
import { addEvent, editEvent } from "../store/actions/dates";
import DateTimePicker from "react-native-modal-datetime-picker";
import CustomPicker from "../components/CustomPicker";

const AddEventScreen = ({ dates, cats, addEvent, navigation }) => {
  const selectedEvent = navigation.getParam("selectedEvent");
  const [title, setTitle] = useState(selectedEvent ? selectedEvent.title : "");
  const [allDaySwitch, setAllDaySwitch] = useState(
    selectedEvent ? selectedEvent.allDay : true
  );
  const [time, setTime] = useState(
    selectedEvent ? selectedEvent.time : "08:00"
  );
  const [localization, setLocalization] = useState(
    selectedEvent ? selectedEvent.localization : ""
  );
  const [description, setDescription] = useState(
    selectedEvent ? selectedEvent.description : ""
  );
  const [timePickerVisibility, setTimePickerVisibility] = useState(false);
  const [pickerValue, setPickerValue] = useState("");

  const pickerValues = {
    "Without repeating": "no",
    "Every day": "day",
    "Every week": "week",
    "Every month": "month",
    "Every year": "year"
  };

  let date = moment(dates.selectedDay, "YYYY-MM-DD").format("DD MMM YYYY");

  const showTimePicker = () => {
    setTimePickerVisibility(true);
  };

  const hideTimePicker = () => {
    setTimePickerVisibility(false);
  };

  const handleTimePicker = time => {
    const h = time.getHours() < 10 ? "0" + time.getHours() : time.getHours();
    const m =
      time.getMinutes() < 10 ? "0" + time.getMinutes() : time.getMinutes();
    setTime(h + ":" + m);
    setTimePickerVisibility(false);
  };

  const validation = () => {
    if (title.trim().length == 0) {
      ToastAndroid.show("Enter the title of the event.", ToastAndroid.SHORT);
      return true;
    } else {
      return false;
    }
  };

  const handleAddEventButton = () => {
    const isSomethingMissing = validation();
    if (!isSomethingMissing) {
      addEvent(
        cats.selectedCatId,
        dates.selectedDay,
        title,
        allDaySwitch,
        time,
        localization,
        description
      );
      navigation.navigate("CalendarStackScreen");
    }
  };

  const handleEditEventButton = () => {
    const isSomethingMissing = validation();
    if (!isSomethingMissing) {
      console.log(
        selectedEvent.id,
        title,
        allDaySwitch,
        time,
        localization,
        description
      );
      editEvent(
        selectedEvent.id,
        title,
        allDaySwitch,
        time,
        localization,
        description
      );
      navigation.navigate("CalendarStackScreen");
    }
  };

  return (
    <KeyboardAvoidingView behavior="position">
      <View style={styles.screen}>
        <CustomFormInput
          label="Title:"
          placeholder=""
          value={title}
          valueChange={text => setTitle(text)}
        />
        <View style={styles.rowContainer}>
          <Text style={styles.text}>All day</Text>
          <Switch
            value={allDaySwitch}
            onValueChange={() => setAllDaySwitch(!allDaySwitch)}
          />
        </View>
        {!allDaySwitch && (
          <View style={styles.rowContainer}>
            <Text style={styles.text}>{date}</Text>
            <TouchableOpacity onPress={() => showTimePicker()}>
              <Text style={styles.text}>{time}</Text>
            </TouchableOpacity>
          </View>
        )}
        <CustomFormInput
          label="Localization:"
          placeholder=""
          value={localization}
          valueChange={text => setLocalization(text)}
        />
        {/* <CustomPicker
          pickerValue={pickerValue}
          pickerValues={pickerValues}
          setValue={value => setPickerValue(value)}
        /> */}
        <CustomFormInput
          label="Description:"
          placeholder=""
          value={description}
          valueChange={text => setDescription(text)}
          large={true}
        />
        <BigAddButton
          buttonText={selectedEvent ? "Edit event" : "Add new event"}
          handleOnPress={
            selectedEvent ? handleEditEventButton : handleAddEventButton
          }
        />
        <DateTimePicker
          isVisible={timePickerVisibility}
          mode="time"
          locale="pl_PL"
          onConfirm={handleTimePicker}
          onCancel={hideTimePicker}
        />
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  screen: {
    alignItems: "center",
    marginTop: 20
  },
  rowContainer: {
    flexDirection: "row",
    width: "80%",
    marginVertical: 10,
    justifyContent: "space-between",
    alignItems: "center"
  },
  text: {
    color: "black",
    fontSize: 18,
    fontWeight: "bold"
  }
});

const mapStateToProps = state => ({
  dates: state.dates,
  cats: state.cats
});

const mapDispatchToProps = dispatch => ({
  addEvent: (catId, date, title, allDay, time, localization, description) =>
    dispatch(
      addEvent(catId, date, title, allDay, time, localization, description)
    ),
  editEvent: (id, title, allDaySwitch, time, localization, description) =>
    dispatch(
      editEvent(id, title, allDaySwitch, time, localization, description)
    )
});

export default connect(mapStateToProps, mapDispatchToProps)(AddEventScreen);
