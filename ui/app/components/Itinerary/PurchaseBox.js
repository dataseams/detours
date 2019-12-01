import { Box, Divider, Typography } from "@material-ui/core";

import { Purchase } from "../Buttons";

const PurchaseBox = props => {
  const { classes } = props;

  return (
    <Box className={classes.purchaseContainer} m={5}>
      <Typography className={classes.purchaseItem}>
        Get complete access to your itinerary for <b>just $10</b>.
      </Typography>
      <Box width="100px">
        <Divider variant="middle"></Divider>
      </Box>
      <Purchase className={classes.purchaseItem}>Purchase</Purchase>
    </Box>
  );
};

export default PurchaseBox;
