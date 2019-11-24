import { Field } from "redux-form";
import { makeStyles } from "@material-ui/styles";

import renderCheckbox from "./Checkbox";

const showOptions = [
  { name: "Musicals", id: "shows.musicals" },
  { name: "Plays", id: "shows.plays" },
  { name: "Concerts", id: "shows.concerts" },
  { name: "Immersive theater", id: "shows.immersiveTheater" }
];

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexDirection: "column"
  }
}));

const ShowsField = props => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {showOptions.map((choice, index) => (
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

export default ShowsField;
