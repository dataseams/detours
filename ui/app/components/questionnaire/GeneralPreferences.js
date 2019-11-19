import { Field } from "redux-form";
import { Input } from "@material-ui/core";

import { StyledCheckbox } from "../styles";
import renderCheckBox from "./Checkbox";

const preferenceOptions = [
  { name: "Food & beverages", id: "food & beverages" },
  { name: "Must see attractions", id: "must see attractions" },
  { name: "Museums", id: "museums" },
  { name: "Historical buildings", id: "historical buildings" },
  { name: "Spas & wellness", id: "spas & wellness" },
  { name: "Outdoors", id: "outdoors" },
  { name: "Tours", id: "tours" },
  { name: "Local culture", id: "Local culture" },
  { name: "Shopping", id: "shopping" },
  { name: "Performances & shows", id: "performances & shows" },
  { name: "Nightlife", id: "nigthlife" },
  { name: "Adventure sports", id: "adventure sports" }
];

const GeneralPreferencesField = props => {
  const { classes } = props;

  return (
    <Field
      name="generalpreferences"
      classes={classes}
      component={renderCheckBox}
      options={preferenceOptions}
    >
      {preferenceOptions.map((choice, index) => (
        <StyledCheckbox
          key={choice.id}
          label={choice.name}
          value={choice.id}
        />
      ))}
    </Field>
  );
};

export default GeneralPreferencesField;
