import { useEffect, useState } from "react";
import { Box, Divider, Typography, Grid, Button } from "@material-ui/core";
import { useSelector } from "react-redux";
import { useMutation, useQuery } from "@apollo/react-hooks";
import { useRouter } from "next/router";
import { makeStyles } from "@material-ui/styles";
import { loadStripe } from "@stripe/stripe-js";
import { Purchase } from "../Buttons";
import UPDATE_USER from "../../utils/queries/UpdateUser";
import CHECK_USER_ID from "../../utils/queries/CheckUserId";

const stripePromise = loadStripe(process.env.STRIPE_PUBLIC_KEY);
const useStyles = makeStyles((theme) => ({
  purchaseContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  purchaseItem: {
    padding: "1em",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  divider: {
    height: "2px",
    backgroundColor: theme.palette.primary.main,
    margin: "1em",
  },
  purchaseSubContainer: {
    width: "90px",
    padding: "0px",
    margin: "0px",
  },
}));

const PurchaseBox = ({ paymentStatus }) => {
  const classes = useStyles();
  const userEmail = useSelector((state) => state.user.email);
  const {
    query: { surveyId },
  } = useRouter();
  const [idAvailable, setIdAvailable] = useState(false);
  const variables = { surveyResponseNodeId: surveyId };
  const { data: isItinerarySaved } = useQuery(CHECK_USER_ID, {
    variables: variables,
  });
  const [savePlan, { data }] = useMutation(UPDATE_USER, {
    refetchQueries: [{ query: CHECK_USER_ID, variables: variables }],
  });

  useEffect(() => {
    if (isItinerarySaved && isItinerarySaved.isItinerarySaved) {
      setIdAvailable(isItinerarySaved.isItinerarySaved);
    }
  }, [isItinerarySaved]);
  const handleClick = async (event) => {
    const stripe = await stripePromise;
    const response = await fetch("/create-checkout-session", {
      method: "POST",
      headers: new Headers({ "Content-Type": "application/json" }),
      credentials: "same-origin",
      body: JSON.stringify({ surveyId: surveyId }),
    });
    const session = await response.json();
    const result = await stripe.redirectToCheckout({
      sessionId: session.id,
    });
    if (result.error) {
      // If `redirectToCheckout` fails due to a browser or network
      // error, display the localized error message to your customer
      // using `result.error.message`.
    }
  };
  return (
    <Box>
      {userEmail ? (
        <Box className={classes.purchaseContainer}>
          <Typography className={classes.purchaseItem}>
            Do you like this itinerary? Save it to your account.
          </Typography>
          <Box className={classes.purchaseSubContainer}>
            <Divider variant="middle" className={classes.divider} />
          </Box>
          <Purchase
            className={classes.purchaseItem}
            disabled={Boolean(data) || idAvailable}
            onClick={() =>
              savePlan({
                variables: {
                  surveyResponseId: surveyId,
                  travelerEmail: userEmail,
                },
              })
            }
          >
            {data ? "Saved" : "Save"}
          </Purchase>
          {paymentStatus === "unpaid" && (
            <Button onClick={handleClick}>Checkout</Button>
          )}
        </Box>
      ) : (
        <Box className={classes.purchaseContainer}>
          <Typography className={classes.purchaseItem}>
            Log in to save your itinerary.
          </Typography>
          <Box className={classes.purchaseSubContainer}>
            <Divider variant="middle" className={classes.divider} />
          </Box>
          <Purchase className={classes.purchaseItem} disabled={true}>
            Save
          </Purchase>
        </Box>
      )}
    </Box>
  );
};

export default PurchaseBox;
