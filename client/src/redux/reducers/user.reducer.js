import { types } from "../actions";
import initialState from "./initial.state";

export default function(state = initialState.user, action) {
  switch (action.type) {
    case types.SET_USER:
      return action.data;
    case types.CLEAR_USER:
      return action.data;
    default:
      return state;
  }
}
