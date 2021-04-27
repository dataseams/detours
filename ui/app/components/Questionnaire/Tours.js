import { Field } from "redux-form";
import { makeStyles } from "@material-ui/styles";

import renderCheckbox from "./Checkbox";

const tourOptions = [
  { name: "Biking tours", id: "tours.bikingTours" },
  { name: "Bus tours", id: "tours.busTours" },
  { name: "Walking tours", id: "tours.walkingTours" },
  { name: "Day trips", id: "tours.dayTrips" },
  { name: "Boat tours", id: "tours.boatTours" },
  { name: "Classes", id: "tours.classes" },
  { name: "Guided tours", id: "tours.guidedTours" },
];

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
  },
}));

const ToursField = (props) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {tourOptions.map((choice, index) => (
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

export default ToursField;
