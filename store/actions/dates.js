import Event from "../../models/Event";

export const ADD_SELECTED_DATE = "ADD_SELECTED_DATE";
export const GET_EVENTS = "GET_EVENTS";
export const ADD_EVENT = "ADD_EVENT";
export const DELETE_EVENT = "DELETE_EVENT";
export const EDIT_EVENT = "EDIT_EVENT";

export const fetchEvents = () => {
  return async dispatch => {
    const response = await fetch(
      "https://cat-owner-helper.firebaseio.com/dates/events.json"
    );

    if (!response.ok) throw new Error("Something went wrong!");

    const resData = await response.json();
    const loadedEvents = [];

    for (const key in resData) {
      loadedEvents.push(
        new Event(
          key,
          resData[key].date,
          resData[key].title,
          resData[key].allDay,
          resData[key].time,
          resData[key].localization,
          resData[key].description
        )
      );
    }

    dispatch({
      type: GET_EVENTS,
      events: loadedEvents
    });
  };
};

export const addSelectedDate = dateString => {
  return async dispatch => {
    await fetch("https://cat-owner-helper.firebaseio.com/dates.json", {
      method: "PATCH",
      header: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        selectedDay: dateString
      })
    });

    dispatch({
      type: ADD_SELECTED_DATE,
      dateString
    });
  };
};

export const addEvent = (
  date,
  title,
  allDaySwitch,
  time,
  localization,
  description
) => {
  return async dispatch => {
    const response = await fetch(
      "https://cat-owner-helper.firebaseio.com/dates/events.json",
      {
        method: "POST",
        header: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          date,
          title,
          allDaySwitch,
          time,
          localization,
          description
        })
      }
    );
    const resData = await response.json();

    dispatch({
      type: ADD_EVENT,
      eventData: {
        id: resData.name,
        date,
        title,
        allDaySwitch,
        time,
        localization,
        description
      }
    });
  };
};

export const deleteEvent = id => {
  return async dispatch => {
    await fetch(
      `https://cat-owner-helper.firebaseio.com/dates/events/${id}.json`,
      {
        method: "DELETE"
      }
    );

    dispatch({
      type: DELETE_EVENT,
      payload: id
    });
  };
};
