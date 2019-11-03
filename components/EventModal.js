import React, { useState, useEffect } from "react";
import {
  Modal,
  View,
  StyleSheet,
  Text,
  Switch,
  TextInput,
  Button,
  TouchableOpacity,
  ToastAndroid
} from "react-native";
import DateTimePicker from "react-native-modal-datetime-picker";
import CustomPicker from "./CustomPicker";

const EventModal = props => {
  const [title, setTitle] = useState("");
  const [time, setTime] = useState("08:00");
  const [allDaySwitch, setAllDaySwitch] = useState(true);
  const [localization, setLocalization] = useState("");
  const [description, setDescription] = useState("");
  const [timePickerVisibility, setTimePickerVisibility] = useState(false);
  const [pickerValue, setPickerValue] = useState("");
  const pickerValues = {
    "Without repeating": "no",
    "Every day": "day",
    "Every week": "week",
    "Every month": "month",
    "Every year": "year"
  };

  const resetValues = () => {
    setTitle("");
    setAllDaySwitch(false);
    setTime("08:00");
    setLocalization("");
    setDescription("");
  };

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

  return (
    <View style={styles.modal}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={props.modalVis}
        onRequestClose={() => {
          resetValues();
          props.handleCancelPress();
        }}
      >
        <View style={styles.modalContainer}>
          <View style={styles.innercontainer}>
            <TextInput
              style={styles.inputContainer}
              placeholder="Title"
              value={title}
              onChangeText={text => setTitle(text)}
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
                <Text style={styles.text}>{props.selectedDay}</Text>
                <TouchableOpacity onPress={() => showTimePicker()}>
                  <Text style={styles.text}>{time}</Text>
                </TouchableOpacity>
              </View>
            )}
            <DateTimePicker
              isVisible={timePickerVisibility}
              mode="time"
              locale="pl_PL"
              onConfirm={handleTimePicker}
              onCancel={hideTimePicker}
            />
            <TextInput
              style={styles.inputContainer}
              placeholder="Localization"
              value={localization}
              onChangeText={text => setLocalization(text)}
            />
            <CustomPicker
              pickerValue={pickerValue}
              pickerValues={pickerValues}
              setValue={value => setPickerValue(value)}
            />
            <TextInput
              style={styles.bigInputContainer}
              placeholder="Description"
              multiline={true}
              numberOfLines={2}
              maxLength={40}
              value={description}
              onChangeText={text => setDescription(text)}
            />
            <View style={styles.rowContainer}>
              <Button
                title="Cancel"
                onPress={() => {
                  resetValues();
                  props.handleCancelPress();
                }}
              />
              <Button
                title="Save"
                onPress={() => {
                  if (title.replace(" ", "") == "")
                    ToastAndroid.show("Enter title!", ToastAndroid.SHORT);
                  else {
                    resetValues();
                    props.handleSavePress(
                      title,
                      allDaySwitch,
                      time,
                      localization,
                      description
                    );
                  }
                }}
              />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    justifyContent: "center"
  },
  modalContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  innercontainer: {
    paddingVertical: 15,
    alignItems: "center",
    width: "85%",
    elevation: 5,
    height: 400,
    backgroundColor: "white",
    borderRadius: 10
  },
  inputContainer: {
    borderWidth: 1,
    width: "90%",
    paddingHorizontal: 10,
    paddingVertical: 5,
    fontSize: 16
  },
  rowContainer: {
    flexDirection: "row",
    width: "90%",
    marginVertical: 10,
    justifyContent: "space-between",
    alignItems: "center"
  },
  bigInputContainer: {
    borderWidth: 1,
    width: "90%",
    paddingHorizontal: 10,
    paddingVertical: 5,
    fontSize: 16,
    textAlignVertical: "top"
  },
  text: {
    fontSize: 16
  }
});

export default EventModal;
