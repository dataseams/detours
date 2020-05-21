import { Box, Divider, Typography, Grid } from "@material-ui/core";
import { useSelector } from "react-redux";
import { useMutation } from "@apollo/react-hooks";
import { useRouter } from "next/router";

import { Purchase } from "../Buttons";
import Auth from "../auth";
import UPDATE_USER from "../../utils/queries/UpdateUser";

const PurchaseBox = props => {
  const { classes } = props;
  const userEmail = useSelector(state => state.user.email);
  const { query: { surveyId } } = useRouter();
  const [savePlan, { data }] = useMutation(UPDATE_USER);

  return (
    <Box>
      {userEmail ?
        <Box className={classes.purchaseContainer} m={5}>
          <Typography className={classes.purchaseItem}>
            Do you like this itinerary? Save it to your account.
          </Typography>
          <Box className={classes.purchaseSubContainer}>
            <Divider variant="middle" className={classes.divider} />
          </Box>
          <Purchase
            className={classes.purchaseItem}
            disabled={Boolean(data)}
            onClick={
              () => savePlan({
                variables: {
                  surveyResponseId: surveyId, travelerEmail: userEmail
                }
              }
              ).then(r => console.log(r)).catch(e => console.log(e))
            }>
            {data ? "Saved" : "Save"}
          </Purchase>
        </Box>
        :
        <Box className={classes.purchaseContainer} m={5}>
          <Typography className={classes.purchaseItem}>
            <Auth /> to save your itinerary.
          </Typography>
          <Box className={classes.purchaseSubContainer}>
            <Divider variant="middle" className={classes.divider} />
          </Box>
          <Purchase className={classes.purchaseItem} disabled={true}>
            Save
          </Purchase>
        </Box>
      }
    </Box >

  );
};

export default PurchaseBox;
