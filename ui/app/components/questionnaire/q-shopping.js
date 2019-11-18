// Global modules
import React from "react";
import Grid from "@material-ui/core/Grid";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormGroup from "@material-ui/core/FormGroup";
import RadioGroup from "@material-ui/core/RadioGroup";
import Paper from "@material-ui/core/Paper";
// Local modules
import { StyledCheckbox, StyledRadio, paperStyles } from "../styles";

function Shopping() {
  const classes = paperStyles();

  const pricePoints = [
    { label: "$", value: "Inexpensive", state: false },
    { label: "$$", value: "Moderate", state: false },
    { label: "$$$", value: "Expensive", state: false },
    { label: "$$$$", value: "Luxury", state: false }
  ];

  const storeTypes = [
    { label: "Department stores", value: "Department stores", state: false },
    { label: "Boutiques", value: "Boutiques", state: false },
    { label: "Markets", value: "Markets", state: false },
    { label: "Gift shops", value: "Gift shops", state: false },
    { label: "Shopping centers", value: "Shopping centers", state: false },
    {
      label: "Thrift shops/Vintage",
      value: "Thrift shops/Vintage",
      state: false
    }
  ];

  const fashionStyles = [
    { label: "Classic", value: "Classic", state: false },
    { label: "Trendy", value: "Trendy", state: false },
    { label: "Edgy", value: "Edgy", state: false },
    { label: "Business", value: "Business", state: false },
    { label: "Formal", value: "Formal", state: false }
  ];

  const pricePoint = {};
  for (var item of pricePoints) {
    pricePoint[item.value] = pricePoints[item.state];
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

  const storeTypesDict = {};
  for (var item of storeTypes) {
    storeTypesDict[item.value] = false;
  }

  const fashionStylesDict = {};
  for (var item of fashionStyles) {
    fashionStylesDict[item.value] = false;
  }

  const [spacing, setSpacing] = React.useState(2);

  const [storeTypeState, setStoreTypeState] = React.useState(storeTypesDict);
  const handleStoreTypeChange = name => event => {
    setStoreTypeState({ ...storeTypeState, [name]: event.target.checked });
  };

  const [fashionStyleState, setFashionStyleState] = React.useState(
    fashionStylesDict
  );
  const handleFashionStyleChange = name => event => {
    setFashionStyleState({
      ...fashionStyleState,
      [name]: event.target.checked
    });
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
        <p className={classes.q}>2. Which types of stores do you prefer?</p>
        <Grid container justify="flex-start" spacing={spacing}>
          <FormGroup className={classes.cb} onChange={handleStoreTypeChange}>
            {storeTypes.map((choice, index) => (
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
        <p className={classes.q}>3. What best describes your style?</p>
        <Grid container justify="flex-start" spacing={spacing}>
          <FormGroup className={classes.cb} onChange={handleFashionStyleChange}>
            {fashionStyles.map((choice, index) => (
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

export default Shopping;
