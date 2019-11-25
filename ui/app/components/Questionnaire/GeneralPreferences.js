import { Field } from "redux-form";
import { makeStyles } from "@material-ui/styles";

import renderCheckbox from "./Checkbox";

const preferenceOptions = [
  { name: "Food & beverages", id: "generalPreferences.foodnbeverages" },
  { name: "Must see attractions", id: "generalPreferences.mustseeattractions" },
  { name: "Museums", id: "generalPreferences.museums" },
  {
    name: "Historical buildings",
    id: "generalPreferences.historicalbuildings"
  },
  { name: "Spas & wellness", id: "generalPreferences.spasnwellness" },
  { name: "Outdoors", id: "generalPreferences.outdoors" },
  { name: "Tours", id: "generalPreferences.tours" },
  { name: "Local culture", id: "generalPreferences.localculture" },
  { name: "Shopping", id: "generalPreferences.shopping" },
  { name: "Performances & shows", id: "generalPreferences.performancesnshows" },
  { name: "Nightlife", id: "generalPreferences.nigthlife" },
  { name: "Adventure sports", id: "generalPreferences.adventuresports" }
];

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexDirection: "column"
  }
}));

const GeneralPreferencesField = props => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {preferenceOptions.map((choice, index) => (
        <Field
          key={choice.id}
          name={choice.id}
          component={renderCheckbox}
          label={choice.name}
        />
      ))}
    </div>
  );
};

export default GeneralPreferencesField;
