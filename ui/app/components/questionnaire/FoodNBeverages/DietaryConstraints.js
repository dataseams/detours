import { Field } from "redux-form";
import { makeStyles } from "@material-ui/styles";

import renderCheckbox from "../Checkbox";

const dietaryConstraintOptions = [
  { name: "Gluten-free", id: "dining.dietaryConstraints.glutenFree" },
  { name: "Paleo", id: "dining.dietaryConstraints.paleo" },
  { name: "Lactose", id: "dining.dietaryConstraints.lactose" },
  {
    name: "Vegetarian-friendly",
    id: "dining.dietaryConstraints.vegetarianFriendly"
  },
  { name: "Vegan-friendly", id: "dining.dietaryConstraints.veganFriendly" },
  { name: "Pescatarian", id: "dining.dietaryConstraints.pescatarian" },
  { name: "Kosher", id: "dining.dietaryConstraints.kosher" },
  { name: "Halal", id: "dining.dietaryConstraints.halal" },
  { name: "No shellfish", id: "dining.dietaryConstraints.noShellfish" }
];

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexDirection: "column"
  }
}));

const DietaryConstraintsField = props => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {dietaryConstraintOptions.map((choice, index) => (
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

export default DietaryConstraintsField;
