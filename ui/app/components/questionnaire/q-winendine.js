// Global modules
import React from "react";
import Grid from "@material-ui/core/Grid";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormGroup from "@material-ui/core/FormGroup";
import RadioGroup from "@material-ui/core/RadioGroup";
import Paper from "@material-ui/core/Paper";
// Local modules
import { StyledCheckbox, StyledRadio, paperStyles } from "../styles";

function FoodnBeverages() {
  const classes = paperStyles();

  const pricePoints = [
    { label: "$", value: "Inexpensive" },
    { label: "$$", value: "Moderate" },
    { label: "$$$", value: "Expensive" },
    { label: "$$$$", value: "Luxury" }
  ];

  const diningEnvironments = [
    { label: "Hole-in-the-wall", value: "Hole-in-the-wall" },
    { label: "Casual & everyday", value: "Casual & everyday" },
    { label: "Fine dining", value: "Fine dining" },
    { label: "Intimate", value: "Intimate" },
    { label: "New & trending", value: "New & trending" },
    { label: "Party scene", value: "Party scene" },
    { label: "Hipster", value: "Hipster" },
    { label: "Cozy and romantic", value: "Cozy and romantic" },
    { label: "Special occasions", value: "Special occasions" },
    { label: "Where locals hang", value: "Where locals hang" },
    { label: "Good for groups", value: "Good for groups" },
    { label: "Historic", value: "Historic" }
  ];

  const diningFeatures = [
    { label: "No wait", value: "No wait" },
    { label: "Authentic ethnic", value: "Authentic ethnic" },
    { label: "Outdoor dining", value: "Outdoor dining" },
    { label: "Scenic views", value: "Scenic views" },
    { label: "Non-alcoholic options", value: "Non-alcoholic options" },
    { label: "World-class cocktails", value: "World-class cocktails" },
    { label: "Notable wine lists", value: "Notable wine lists" },
    { label: "Food markets", value: "Food markets" },
    { label: "Late night eats", value: "Late night eats" },
    { label: "Craft beer", value: "Craft beer" },
    { label: "Artisinal coffee", value: "Artisinal coffee" },
    { label: "Aperitif", value: "Aperitif" }
  ];

  const yesNo = [{ label: "No", value: "No" }, { label: "Yes", value: "Yes" }];

  const dietaryConstraints = [
    { label: "Gluten-free", value: "Gluten-free" },
    { label: "Paleo", value: "Paleo" },
    { label: "Lactose", value: "Lactose" },
    { label: "Vegetarian-friendly", value: "Vegetarian-friendly" },
    { label: "Vegan-friendly", value: "Vegan-friendly" },
    { label: "Pescatarian", value: "Pescatarian" },
    { label: "Kosher", value: "Kosher" },
    { label: "Halal", value: "Halal" },
    { label: "No shellfish", value: "No shellfish" }
  ];

  const pricePoint = {};
  for (var item of pricePoints) {
    pricePoint[item.value] = false;
  }
  for (var item of pricePoints) {
    pricePoint[item.value + "_class"] = classes.paper;
  }

  const [pricePointState, pricePointSetState] = React.useState(pricePoint);
  const handlePricePointChange = name => event => {
    let ppDict = pricePoint;
    let ppKeys = Object.keys(pricePointState);
    let otherKeys = new Set(
      [...ppKeys].filter(
        x =>
          x !== name &&
          ["Inexpensive", "Moderate", "Expensive", "Luxury"].includes(x)
      )
    );
    for (var k of otherKeys) {
      ppDict[k] = false;
      ppDict[k + "_class"] = classes.paper;
    }
    ppDict[name] = true;
    ppDict[name + "_class"] = classes.paperSelected;

    pricePointSetState(ppDict);
    console.log(pricePointState);
  };

  const environmentDict = {};
  for (var item of diningEnvironments) {
    environmentDict[item.value] = false;
  }

  const featureDict = {};
  for (var item of diningFeatures) {
    environmentDict[item.value] = false;
  }

  const dietaryDict = {};
  for (var item of dietaryConstraints) {
    dietaryConstraints[item.value] = false;
  }

  const [spacing, setSpacing] = React.useState(2);

  const [environmentState, setEnvironmentState] = React.useState(
    environmentDict
  );
  const handleEnvironmentChange = name => event => {
    setEnvironmentState({ ...environmentState, [name]: event.target.checked });
  };

  const [featureState, setFeatureState] = React.useState(featureDict);
  const handleFeatureChange = name => event => {
    setFeatureState({ ...featureState, [name]: event.target.checked });
  };

  const [dietaryValue, setDietaryValue] = React.useState("No");
  const handleDietaryValueChange = event => {
    setDietaryValue(event.target.value);
  };

  const [dietaryState, setDietaryState] = React.useState(dietaryDict);
  const handleDietaryChange = name => event => {
    setDietaryState({ ...dietaryState, [name]: event.target.checked });
  };

  return (
    <Grid container spacing={5}>
      <Grid item xs={12}>
        <p className={classes.q}>1. What is your preferred price point?</p>
        <Grid id="pricepoints" container justify="center" spacing={spacing}>
          {pricePoints.map((price, index) => (
            <Grid item key={index}>
              <Paper
                className={pricePointState[price.value + "_class"]}
                onClick={handlePricePointChange(price.value)}
              >
                <div>{price.label}</div>
                <div>{price.value}</div>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <p className={classes.q}>2. Which dining environments do you prefer?</p>
        <Grid container justify="flex-start" spacing={spacing}>
          <FormGroup className={classes.cb} onChange={handleEnvironmentChange}>
            {diningEnvironments.map((choice, index) => (
              <FormControlLabel
                key={choice.value}
                value={choice.value}
                control={<StyledCheckbox />}
                label={choice.label}
              />
            ))}
          </FormGroup>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <p className={classes.q}>
          3. Which features do you value in restaurants?
        </p>
        <Grid container justify="flex-start" spacing={spacing}>
          <FormGroup className={classes.cb} onChange={handleFeatureChange}>
            {diningFeatures.map((choice, index) => (
              <FormControlLabel
                key={choice.value}
                value={choice.value}
                control={<StyledCheckbox />}
                label={choice.label}
              />
            ))}
          </FormGroup>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <p className={classes.q}>
          4. Do you or anyone you're traveling with you have any dietary
          constraints?
        </p>
        <Grid container justify="flex-start" spacing={spacing}>
          <RadioGroup
            className={classes.cb}
            value={dietaryValue}
            onChange={handleDietaryValueChange}
          >
            {yesNo.map((choice, index) => (
              <FormControlLabel
                key={choice.value}
                value={choice.value}
                control={<StyledRadio />}
                label={choice.label}
              />
            ))}
          </RadioGroup>
        </Grid>
      </Grid>
      <Grid item xs={12} hidden={dietaryValue === "No"}>
        <p className={classes.q}>5. What are those dietary constraints?</p>
        <Grid container justify="flex-start" spacing={spacing}>
          <FormGroup className={classes.cb} onChange={handleDietaryChange}>
            {dietaryConstraints.map((choice, index) => (
              <FormControlLabel
                key={choice.value}
                value={choice.value}
                control={<StyledCheckbox />}
                label={choice.label}
              />
            ))}
          </FormGroup>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default FoodnBeverages;
