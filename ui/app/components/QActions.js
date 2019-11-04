const UPDATE_CITY = "UPDATE_CITY";
function addCity(text) {
  return { type: UPDATE_CITY, text };
}

export { UPDATE_CITY, addCity };
