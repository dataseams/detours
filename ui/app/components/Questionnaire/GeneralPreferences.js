import { Field } from "redux-form";
import { makeStyles } from "@material-ui/styles";

import renderCheckbox from "./Checkbox";

const preferenceOptions = [
  { name: "Food & beverages", id: "generalPreferences.Food & beverages" },
  {
    name: "Must see attractions",
    id: "generalPreferences.Must see attractions",
  },
  { name: "Museums", id: "generalPreferences.Museums" },
  {
    name: "Historical buildings",
    id: "generalPreferences.Historical buildings",
  },
  { name: "Spas & wellness", id: "generalPreferences.Spas & wellness" },
  { name: "Outdoors", id: "generalPreferences.Outdoors" },
  { name: "Tours", id: "generalPreferences.Tours" },
  { name: "Local culture", id: "generalPreferences.Local culture" },
  { name: "Shopping", id: "generalPreferences.Shopping" },
  {
    name: "Performances & shows",
    id: "generalPreferences.Performances & shows",
  },
  { name: "Nightlife", id: "generalPreferences.Night life" },
  { name: "Adventure sports", id: "generalPreferences.Adventure sports" },
];

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
  },
}));

const GeneralPreferencesField = (props) => {
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
