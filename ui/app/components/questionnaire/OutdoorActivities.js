import { Field } from "redux-form";
import { makeStyles } from "@material-ui/styles";

import renderCheckbox from "./Checkbox";

const outdoorActivityOptions = [
  { name: "Parks/Gardens", id: "outdoorActivities.parksGardens" },
  { name: "Hiking", id: "outdoorActivities.hiking" },
  { name: "Natural wonders", id: "outdoorActivities.naturalWonders" },
  { name: "Beaches", id: "outdoorActivities.beaches" },
  { name: "Scenic views", id: "outdoorActivities.scenicViews" },
];

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexDirection: "column"
  }
}));

const OutdoorActivitiesField = props => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {outdoorActivityOptions.map((choice, index) => (
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

export default OutdoorActivitiesField;
