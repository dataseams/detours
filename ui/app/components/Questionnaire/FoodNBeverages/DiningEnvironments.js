import { Field } from "redux-form";
import { makeStyles } from "@material-ui/styles";

import renderCheckbox from "../Checkbox";

const diningEnvironmentOptions = [
  { name: "Hole-in-the-wall", id: "dining.environment.Hole-in-the-wall" },
  { name: "Casual & everyday", id: "dining.environment.Casual and everyday" },
  { name: "Fine dining", id: "dining.environment.Fine" },
  { name: "Intimate", id: "dining.environment.Intimate" },
  { name: "New & trending", id: "dining.environment.New & trending" },
  { name: "Party scene", id: "dining.environment.Party scene" },
  { name: "Hipster", id: "dining.environment.Hipster" },
  { name: "Cozy and romantic", id: "dining.environment.Cozy and romantic" },
  { name: "Special occasions", id: "dining.environment.Special occasions" },
  { name: "Where locals hang", id: "dining.environment.Where locals hang" },
  { name: "Good for groups", id: "dining.environment.Good for groups" },
  { name: "Historic", id: "dining.environment.Historic" },
];

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
  },
}));

const DiningEnvironmentsField = (props) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {diningEnvironmentOptions.map((choice, index) => (
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

export default DiningEnvironmentsField;
