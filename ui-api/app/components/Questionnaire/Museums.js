import { Field } from "redux-form";
import { makeStyles } from "@material-ui/styles";

import renderCheckbox from "./Checkbox";

const museumOptions = [
  { name: "History", id: "museum.history" },
  { name: "Science", id: "museum.science" },
  { name: "Art", id: "museum.art" },
  { name: "Design", id: "museum.design" },
  { name: "War", id: "museum.war" }
];

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexDirection: "column"
  }
}));

const MuseumsField = props => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {museumOptions.map((choice, index) => (
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

export default MuseumsField;
