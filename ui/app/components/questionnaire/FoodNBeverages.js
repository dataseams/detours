import { Grid } from "@material-ui/core";

import DiningEnvironmentsField from "./FoodNBeverages/DiningEnvironments";
import DiningFeaturesField from "./FoodNBeverages/DiningFeatures";
import DietaryConstraintsFilterField from "./FoodNBeverages/DietaryConstraintsFilter";
import DietaryConstraintsField from "./FoodNBeverages/DietaryConstraints";
import PricePointsField from "./FoodNBeverages/PricePoints";
import { paperStyles } from "./styles/paper";

const FoodNBeveragesField = props => {
  const classes = paperStyles();
  const [spacing, setSpacing] = React.useState(2);

  return (
    <Grid container spacing={5}>
      <Grid item xs={12}>
        <p className={classes.q}>1. What is your preferred price point?</p>
        <Grid
          id="pricepoints"
          container
          justify="center"
          spacing={spacing}
          className={classes.cb}
        >
          <PricePointsField />
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <p className={classes.q}>2. Which dining environments do you prefer?</p>
        <Grid
          container
          justify="flex-start"
          spacing={spacing}
          className={classes.cb}
        >
          <DiningEnvironmentsField />
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <p className={classes.q}>
          3. Which features do you value in restaurants?
        </p>
        <Grid
          container
          justify="flex-start"
          spacing={spacing}
          className={classes.cb}
        >
          <DiningFeaturesField />
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <p className={classes.q}>
          4. Do you or anyone you're traveling with you have any dietary
          constraints?
        </p>
        <Grid
          container
          justify="flex-start"
          spacing={spacing}
          className={classes.cb}
        >
          <DietaryConstraintsFilterField />
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <p className={classes.q}>5. What are those dietary constraints?</p>
        <Grid
          container
          justify="flex-start"
          spacing={spacing}
          className={classes.cb}
        >
          <DietaryConstraintsField />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default FoodNBeveragesField;
