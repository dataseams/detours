import { Box, Divider, Typography, Grid } from "@material-ui/core";
import { useSelector } from "react-redux";

import { Purchase } from "../Buttons";

const PurchaseBox = props => {
  const { classes } = props;
  const userEmail = useSelector(state => state.user.email);

  async function handleSave(context) {
    const graphQlUri = "http://localhost:5000/graphql";
    const variables = { "surveyResponseId": context.query.surveyId, "travelerEmail": userEmail };
    const query = `
      mutation updateEmail(
        $surveyResponseId: String!,
        $travelerEmail: String=!
      ){
        updateTravelerEmailForSurveyResponse(surveyResponseId: $surveyResponseId, travelerEmail: $travelerEmail){
          surveyResponse{
            id
            travelerEmail
          }
        }
      }
    `;
    const fetch = createApolloFetch({ uri: graphQlUri });
    const res = await fetch({ query: query, variables: variables });
    const updatedEmail = res.data.updateTravelerEmailForSurveyResponse.surveyResponse.travelerEmail;
    return { props: { updatedEmail: updatedEmail } }
  }

  return (
    <Box>
      <Box className={classes.purchaseContainer} m={5}>
        <Typography className={classes.purchaseItem}>
          Get complete access to your itinerary for <b>just $10</b>.
        </Typography>
        <Box className={classes.purchaseSubContainer}>
          <Divider variant="middle" className={classes.divider} />
        </Box>
        <Purchase className={classes.purchaseItem} onClick={handleSave}>
          Purchase
        </Purchase>
      </Box>
    </Box>

  );
};

export default PurchaseBox;
