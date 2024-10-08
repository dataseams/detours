import React from "react";
import { makeStyles } from "@material-ui/styles";
import { useMutation, useQuery } from "@apollo/react-hooks";
import { useSelector } from "react-redux";
import { Box, Typography } from "@material-ui/core";
import GET_USER_RECORD from "../../utils/queries/GetUserRecord";
import DELETE_USER from "../../utils/queries/DeleteUser";
import IsThisGoodbye from "./IsThisGoodbye";
import BeforeYouGo from "./BeforeYouGo";
import DeleteConfirmation from "./DeleteConfirmation";

const useStyles = makeStyles((theme) => ({
  listBorders: {
    borderRadius: "15px",
    marginTop: "20px",
    marginLeft: "25px",
    marginRight: "0px",
    border: `1px solid ${theme.palette.borderColor}`,
    [theme.breakpoints.down("xs")]: {
      marginLeft: "0",
      width: "auto",
    },
    padding: "30px",
  },
  errorComponent: {
    fontStyle: "italic",
    color: "red",
    fontSize: 16,
  },
}));

const DeleteAccount = () => {
  const classes = useStyles();
  const userEmail = useSelector((state) => state?.user?.email);
  const variables = { email: userEmail };
  const { data: userData } = useQuery(GET_USER_RECORD, {
    variables: variables,
    skip: !userEmail,
  });
  const userRecord = userData?.getUserRecord;
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const refetchRecords = {
    refetchQueries: [{ query: GET_USER_RECORD, variables: variables }],
  };
  const [deleteUser, { error, data: deleteData }] = useMutation(
    DELETE_USER,
    refetchRecords
  );
  const handleListItemClick = (event, index, variables) => {
    setSelectedIndex(index);
    if (variables) {
      deleteUser({
        variables: variables,
      });
    }
  };
  const isSuccess = deleteData?.deleteUser?.userRecord?.id;
  return (
    <>
      {!isSuccess && userRecord && (
        <Box className={classes.listBorders}>
          {selectedIndex === 0 ? (
            <IsThisGoodbye handleListItemClick={handleListItemClick} />
          ) : selectedIndex === 1 ? (
            <BeforeYouGo handleListItemClick={handleListItemClick} />
          ) : error ? (
            <div>
              <BeforeYouGo handleListItemClick={handleListItemClick} />
              <Typography className={classes.errorComponent}>
                Oops! Error are annoying and I'm not sure what caused this one.
                Please try again. If you keep getting this error don't shy away
                from contacting us!
              </Typography>
            </div>
          ) : (
            <DeleteConfirmation />
          )}
        </Box>
      )}
    </>
  );
};

export default DeleteAccount;
