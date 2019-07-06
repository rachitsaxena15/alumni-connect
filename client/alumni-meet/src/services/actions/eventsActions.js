import { LOAD_EVENTS } from "./types";

export const loadEvents = () => dispatch => {
  fetch("api/event/list")
    .then(res => res.json())
    .then(data => {
      console.log(data);
      dispatch({ type: LOAD_EVENTS, payload: data });
    });
};

export const addEvent = event => dispatch => {
  fetch("api/event/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(event)
  })
    .then(res => loadEvents()(dispatch))
    .catch(err => console.log("ERRRRRRRORRRRR.."));
};