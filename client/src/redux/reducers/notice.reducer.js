import { types } from "../actions";
import initialState from "./initial.state";

export default function(state = initialState.notice, action) {
  switch (action.type) {
    case types.NOTICE:
      return action.data;
    case types.CLEAR_NOTICE:
      return action.data;
    default:
      return state;
  }
}
