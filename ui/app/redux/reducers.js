import { combineReducers } from "redux";
import { reducer as reduxFormReducer } from "redux-form";

const initialUserState = {
  email: null,
  displayName: null,
  photoUrl: null,
};
const userReducer = (state = initialUserState, action) => {
  switch (action.type) {
    case "UPDATE_USER":
      return {
        ...state,
        email: action.value.userEmail,
        displayName: action.value.userDisplayName,
        photoUrl: action.value.userPhotoUrl,
      };
    default:
      return state;
  }
};
const initialCookieState = {
  cookieBannerConfirmed: false,
};
const cookiesReducer = (state = initialCookieState, action) => {
  switch (action.type) {
    case "UPDATE_COOKIE":
      return {
        ...state,
        cookieBannerConfirmed: true,
      };
    default:
      return state;
  }
};
const cookieReducer = { cookie: cookiesReducer };
const cookieReducers = combineReducers(cookieReducer);
const itinararyReducers = { user: userReducer };
const itineraryReducer = combineReducers(itinararyReducers);

const questionnaireReducers = {
  user: userReducer,
  form: reduxFormReducer,
};
const questionnaireReducer = combineReducers(questionnaireReducers);

export { itineraryReducer, questionnaireReducer, cookieReducers };
