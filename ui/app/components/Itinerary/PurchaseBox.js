import { Box, Divider, Typography, Grid } from "@material-ui/core";
import { useSelector } from "react-redux";
import { useMutation } from "@apollo/react-hooks";
import { useRouter } from "next/router";
import { makeStyles } from "@material-ui/styles";

import { Purchase } from "../Buttons";
import Auth from "../auth";
import UPDATE_USER from "../../utils/queries/UpdateUser";

const useStyles = makeStyles(theme => ({
  purchaseContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  purchaseItem: {
    padding: "1em",
    display: "flex",
    flexDirection: "row",
    alignItems: "center"
  },
  divider: {
    height: "2px",
    backgroundColor: "#5865bc",
    margin: "1em"
  },
  purchaseSubContainer: {
    width: "90px",
    padding: "0px",
    margin: "0px"
  }
}));

const PurchaseBox = props => {
  const classes = useStyles();
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
          <Auth />
          <Typography className={classes.purchaseItem}>
            to save your itinerary.
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
