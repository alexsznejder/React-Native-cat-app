import { ADD_SELECTED_DATE } from "../actions/dates";

const inicialState = {
  selectedDay: "",
  markedDates: {},
  events: []
};

const datesReducer = (state = inicialState, action) => {
  switch (action.type) {
    case ADD_SELECTED_DATE:
      let newMarkedDates = state.markedDates;
      if (state.selectedDay) {
        if (newMarkedDates[state.selectedDay].marked)
          newMarkedDates[state.selectedDay].selected = false;
        else delete newMarkedDates[state.selectedDay];
      }

      return {
        ...state,
        markedDates: {
          ...newMarkedDates,
          [action.dateString]: { selected: true, disableTouchEvent: true }
        },
        selectedDay: action.dateString
      };
    default:
      return state;
  }
};

export default datesReducer;
