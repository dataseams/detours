import { Box, Divider, Typography, Grid } from "@material-ui/core";

import { Purchase } from "../Buttons";

const PurchaseBox = props => {
  const { classes } = props;

  return (
    <Box>
      <Box className={classes.purchaseContainer} m={5}>
        <Typography className={classes.purchaseItem}>
          Get complete access to your itinerary for <b>just $10</b>.
        </Typography>
        <Box className={classes.purchaseSubContainer}>
          <Divider variant="middle" className={classes.divider} />
        </Box>
        <Purchase className={classes.purchaseItem}>Purchase</Purchase>
      </Box>
    </Box>

  );
};

export default PurchaseBox;
