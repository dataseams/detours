import { Box, Divider, Typography, Grid } from "@material-ui/core";
import { useSelector } from "react-redux";
import ApolloClient from 'apollo-boost';
import { gql } from "apollo-boost";
import { useRouter } from "next/router";

import { Purchase } from "../Buttons";

const PurchaseBox = props => {
  const { classes } = props;
  const userEmail = useSelector(state => state.user.email);
  const { query: { surveyId } } = useRouter();

  function handleSave(props) {
    const graphQlUri = process.env.CORE_API_URL;
    const client = new ApolloClient({
      uri: graphQlUri,
    });
    const variables = { "surveyResponseId": props.surveyResponseId, "travelerEmail": props.travelerEmail };
    const UPDATE_USER = gql`
      mutation updateEmail(
        $surveyResponseId: String!,
        $travelerEmail: String!
      ){
        updateTravelerEmailForSurveyResponse(surveyResponseId: $surveyResponseId, travelerEmail: $travelerEmail){
          surveyResponse{
            id
            travelerEmail
          }
        }
      }
    `;
    client.mutate(
      {
        mutation: UPDATE_USER,
        variables: variables
      }
    ).then(results => console.log(results))
  }

  return (
    <Box>
      {userEmail ?
        <Box className={classes.purchaseContainer} m={5}>
          <Typography className={classes.purchaseItem}>
            Log in to save your itinerary.
          </Typography>
          <Box className={classes.purchaseSubContainer}>
            <Divider variant="middle" className={classes.divider} />
          </Box>
          <Purchase className={classes.purchaseItem} onClick={() => handleSave({ surveyResponseId: surveyId, travelerEmail: userEmail })}>
            Save
          </Purchase>
        </Box>
        :
        <Box className={classes.purchaseContainer} m={5}>
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
      }
    </Box >

  );
};

export default PurchaseBox;
