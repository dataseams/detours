import { Field } from "redux-form";
import { makeStyles } from "@material-ui/styles";

import renderCheckbox from "./Checkbox";

const AdventureSportsOptions = [
  { name: "Kayaking", id: "adventureSports.kayaking" },
  { name: "Rafting/Tubing", id: "adventureSports.raftingTubing" },
  { name: "Skydiving", id: "adventureSports.skydiving" },
  { name: "Diving/Snorkeling", id: "adventureSports.divingSnorkeling" },
  { name: "Ziplining", id: "adventureSports.ziplining" },
  { name: "Mountain biking", id: "adventureSports.mountainBiking" },
  { name: "Paragliding", id: "adventureSports.paragliding" },
  { name: "Surfing", id: "adventureSports.surfing" },
  { name: "Skiing", id: "adventureSports.skiing" }
];

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexDirection: "column"
  }
}));

const AdventureSportsField = props => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {AdventureSportsOptions.map((choice, index) => (
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

export default AdventureSportsField;
