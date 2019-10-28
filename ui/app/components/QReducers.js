//Reducers
import { combineReducers } from "redux";

import { ADD_CITY } from "./QActions";

function cities(state = [], action) {
  switch (action.type) {
    case ADD_CITY:
      console.log(...state);
      return [
        ...state,
        {
          city: action.text
        }
      ];
    default:
      return state;
  }
}

const QuestionnaireReducer = combineReducers({
  cities
});

export default QuestionnaireReducer;
