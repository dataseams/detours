import { Field } from "redux-form";
import { makeStyles } from "@material-ui/styles";

import renderCheckbox from "../Checkbox";

const diningFeatureOptions = [
  { name: "No wait", id: "dining.features.noWait" },
  { name: "Authentic ethnic", id: "dining.features.authenticEthnic" },
  { name: "Outdoor dining", id: "dining.features.outdoorDining" },
  { name: "Scenic views", id: "dining.features.scenicViews" },
  { name: "Non-alcoholic options", id: "dining.features.nonAlcoholicOptions" },
  { name: "World-class cocktails", id: "dining.features.worldClassCocktails" },
  { name: "Notable wine lists", id: "dining.features.notableWineLists" },
  { name: "Food markets", id: "dining.features.foodMarkets" },
  { name: "Late night eats", id: "dining.features.lateNightEats" },
  { name: "Craft beer", id: "dining.features.craftBeer" },
  { name: "Artisinal coffee", id: "dining.features.artisinalCoffee" },
  { name: "Aperitif", id: "dining.features.aperitif" }
];

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexDirection: "column"
  }
}));

const DiningFeaturesField = props => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {diningFeatureOptions.map((choice, index) => (
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

export default DiningFeaturesField;
