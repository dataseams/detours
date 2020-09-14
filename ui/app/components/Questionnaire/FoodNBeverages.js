import { Grid } from "@material-ui/core";

import DiningPricePointsField from "./FoodNBeverages/PricePoints";
import DiningEnvironmentsField from "./FoodNBeverages/DiningEnvironments";
import { paperStyles } from "./styles/paper";

const FoodNBeveragesField = props => {
  const classes = paperStyles();
  const [spacing, setSpacing] = React.useState(2);

  return (
    <Grid container spacing={5}>
      <Grid item xs={12}>
        <p className={classes.q}>What is your preferred price point?</p>
        <Grid
          id="pricepoints"
          container
          justify="center"
          spacing={spacing}
          className={classes.cb}
        >
          <DiningPricePointsField />
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <p className={classes.q}>Which dining environments do you prefer?</p>
        <Grid
          container
          justify="flex-start"
          spacing={spacing}
          className={classes.cb}
        >
          <DiningEnvironmentsField />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default FoodNBeveragesField;
