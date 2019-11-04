import { combineReducers } from "redux";

import { UPDATE_CITY } from "./QActions";

function HandleChange(state = [], action) {
  switch (action.type) {
    case UPDATE_CITY:
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
  HandleChange
});

export default QuestionnaireReducer;
