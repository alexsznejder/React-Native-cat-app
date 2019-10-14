export const ADD_SELECTED_DATE = "ADD_SELECTED_DATE";

export const addSelectedDate = dateString => {
  return {
    type: ADD_SELECTED_DATE,
    dateString: dateString
  };
};
