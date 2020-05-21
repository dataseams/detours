import { Grid } from "@material-ui/core";

import ShoppingPricePointField from "./Shopping/PricePoint";
import StoreTypesField from "./Shopping/StoreType";
import FashionStylesField from "./Shopping/FashionStyle";
import { paperStyles } from "./styles/paper";

const ShoppingField = props => {
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
          <ShoppingPricePointField />
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <p className={classes.q}>2. Which types of stores do you prefer?</p>
        <Grid
          container
          justify="flex-start"
          spacing={spacing}
          className={classes.cb}
        >
          <StoreTypesField />
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <p className={classes.q}>3. What best describes your style?</p>
        <Grid
          container
          justify="flex-start"
          spacing={spacing}
          className={classes.cb}
        >
          <FashionStylesField />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default ShoppingField;
