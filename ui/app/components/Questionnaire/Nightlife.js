import { Field } from "redux-form";
import { makeStyles } from "@material-ui/styles";

import renderCheckbox from "./Checkbox";

const nightlifeOptions = [
  { name: "Nightclubs", id: "nightlife.nightclubs" },
  { name: "Cocktail bars", id: "nightlife.cocktailBars" },
  { name: "Sports bars", id: "nightlife.sportsBars" },
  { name: "Wine bars", id: "nightlife.wineBars" },
  { name: "Bottle service", id: "nightlife.bottleService" },
  { name: "Dancing", id: "nightlife.dancing" },
  { name: "Speakeasies", id: "nightlife.speakeasies" },
  { name: "Craft beer bars", id: "nightlife.craftBeerBars" },
];

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
  },
}));

const NightlifeField = (props) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {nightlifeOptions.map((choice, index) => (
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

export default NightlifeField;
