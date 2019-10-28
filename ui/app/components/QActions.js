const ADD_CITY = "ADD_CITY";
function addCity(text) {
  return { type: ADD_CITY, text };
}

export { ADD_CITY, addCity };
