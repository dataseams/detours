import { Field } from "redux-form";
import { makeStyles } from "@material-ui/styles";

import renderCheckbox from "./Checkbox";

const neighborhoodOptions = [
  { name: "Placeholder 1", id: "neighborhood.placeholder1" },
  { name: "Placeholder 2", id: "neighborhood.placeholder2" },
  { name: "Placeholder 3", id: "neighborhood.placeholder3" },
];

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexDirection: "column"
  }
}));

const NeighborhoodsField = props => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {neighborhoodOptions.map((choice, index) => (
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

export default NeighborhoodsField;
