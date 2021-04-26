import { Field } from "redux-form";
import { makeStyles } from "@material-ui/styles";

import renderCheckbox from "../Checkbox";

const diningEnvironmentOptions = [
  { name: "Hole-in-the-wall", id: "dining.environment.holeInTheWall" },
  { name: "Casual & everyday", id: "dining.environment.casualAndEveryday" },
  { name: "Fine dining", id: "dining.environment.fineDining" },
  { name: "Intimate", id: "dining.environment.intimate" },
  { name: "New & trending", id: "dining.environment.newAndTrending" },
  { name: "Party scene", id: "dining.environment.partyScene" },
  { name: "Hipster", id: "dining.environment.hipster" },
  { name: "Cozy and romantic", id: "dining.environment.cozyAndRomantic" },
  { name: "Special occasions", id: "dining.environment.specialOccasions" },
  { name: "Where locals hang", id: "dining.environment.whereLocalsHang" },
  { name: "Good for groups", id: "dining.environment.goodForGroups" },
  { name: "Historic", id: "dining.environment.historic" },
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
