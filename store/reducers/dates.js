import { ADD_SELECTED_DATE, GET_EVENTS, ADD_EVENT } from "../actions/dates";
import Event from "../../models/Event";

const inicialState = {
  selectedDay: "",
  markedDates: {},
  events: [],
  selectedDayEvents: []
};

const datesReducer = (state = inicialState, action) => {
  switch (action.type) {
    case GET_EVENTS:
      let newMarkedDates = {};
      for (const event of action.events) {
        newMarkedDates[event.date] = { marked: true };
      }

      return {
        ...state,
        events: action.events,
        markedDates: newMarkedDates
      };
    case ADD_SELECTED_DATE:
      newMarkedDates = state.markedDates;
      // console.log(newMarkedDates);
      params = "";
      if (state.selectedDay) {
        if (newMarkedDates[state.selectedDay].marked) {
          delete newMarkedDates[state.selectedDay].selected;
          delete newMarkedDates[state.selectedDay].disableTouchEvent;
        } else delete newMarkedDates[state.selectedDay];
        // console.log(newMarkedDates[state.selectedDay]);
      }
      if (newMarkedDates[action.dateString]) {
        params = { marked: true, selected: true }; //disableTouchEvent: true };
      }
      const selectedEvents = state.events.filter(
        event => event.date === action.dateString
      );
      // console.log(newMarkedDates);

      return {
        ...state,
        markedDates: {
          ...newMarkedDates,
          [action.dateString]: params ? params : { selected: true } //disableTouchEvent: true }
        },
        selectedDayEvents: selectedEvents,
        selectedDay: action.dateString
      };
    case ADD_EVENT:
      const newEvent = new Event(
        action.eventData.id,
        action.eventData.date,
        action.eventData.title,
        action.eventData.allDay,
        action.eventData.time,
        action.eventData.localization,
        action.eventData.description
      );
      newMarkedDates = state.markedDates;
      if (!newMarkedDates[state.selectedDay].marked) {
        newMarkedDates[state.selectedDay].marked = true;
      }

      return {
        ...state,
        events: state.events.concat(newEvent),
        markedDates: newMarkedDates
      };

    default:
      return state;
  }
};

export default datesReducer;
