import { LOAD_EVENTS } from "../actions/types";

const initialState = {
  events: []
};
export default function(state = initialState, { type, payload }) {
  switch (type) {
    case LOAD_EVENTS:
      console.log("reducer : load events");
      return { ...state, events: payload };
    default:
      return state;
  }
}
