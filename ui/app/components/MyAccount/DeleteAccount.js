import React from "react";
import { makeStyles } from "@material-ui/styles";
import { useMutation, useQuery } from "@apollo/react-hooks";
import { useSelector } from "react-redux";
import { Box } from "@material-ui/core";
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
  const [deleteUser, { data: deleteData }] = useMutation(DELETE_USER);
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
          ) : (
            <DeleteConfirmation />
          )}
        </Box>
      )}
    </>
  );
};

export default DeleteAccount;
