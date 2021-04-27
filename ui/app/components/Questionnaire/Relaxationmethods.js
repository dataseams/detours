import { Field } from "redux-form";
import { makeStyles } from "@material-ui/styles";

import renderCheckbox from "./Checkbox";

const relaxMethodOptions = [
  { name: "Spa treatments", id: "relaxationMethods.spaTreatments" },
  { name: "Facials", id: "relaxationMethods.facials" },
  { name: "Massages", id: "relaxationMethods.massages" },
  { name: "Bath houses", id: "relaxationMethods.bathHouses" },
  { name: "Yoga", id: "relaxationMethods.yoga" },
  { name: "Downtime", id: "relaxationMethods.downtime" },
];

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
  },
}));

const RelaxMethodsField = (props) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {relaxMethodOptions.map((choice, index) => (
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

export default RelaxMethodsField;
