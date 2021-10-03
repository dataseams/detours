import React, { useState } from "react";
import {
  FormControl,
  TextField,
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  dialog: {
    borderRadius: "10px",
  },
  saveButton: {
    "& 	.MuiButton-iconSizeMedium > *:first-child": {
      fontSize: "10px",
    },

    textTransform: "capitalize",
    padding: "6px 40px",
    fontWeight: "400",
  },
  cancelButton: {
    "& 	.MuiButton-iconSizeMedium > *:first-child": {
      fontSize: "10px",
    },

    textTransform: "capitalize",
    padding: "6px 35px",
    fontWeight: "400",
  },
}));

const AgeDialog = ({ open, handleDialog, handleSaveAge, userAge }) => {
  const classes = useStyles();
  const [error, setError] = useState(false);
  const [age, setAge] = React.useState(userAge);
  const [disableButton, setDisableButton] = React.useState(
    userAge ? false : true
  );
  const handleAge = (event) => {
    setDisableButton(false);
    const value = event.target.value;
    if (!value || value <= 0) {
      setError(true);
      setDisableButton(true);
      setAge(value);
    } else {
      setAge(value);
      setError(false);
    }
  };
  const onHandleSubmit = () => {
    handleSaveAge(age);
    handleDialog();
  };
  return (
    <Dialog
      onClose={handleDialog}
      aria-labelledby="simple-dialog-title"
      open={open}
      fullWidth
      className={classes.dialog}
      maxWidth="sm"
    >
      <Box p={[0, 3, 3, 3]}>
        <DialogTitle>What is your Age?</DialogTitle>
        <DialogContent>
          <FormControl fullWidth variant="outlined">
            <TextField
              label="Age"
              type="number"
              error={error}
              value={age}
              variant="outlined"
              onChange={handleAge}
            />
            <Box
              display="flex"
              gridGap={[23, 15, 15, 15]}
              justifyContent="center"
              my={5}
            >
              <Button
                variant="outlined"
                color="primary"
                className={classes.cancelButton}
                onClick={handleDialog}
              >
                Cancel
              </Button>
              <Button
                variant="outlined"
                color="primary"
                type="submit"
                className={classes.saveButton}
                variant="contained"
                onClick={onHandleSubmit}
                disabled={disableButton}
              >
                Save
              </Button>
            </Box>
          </FormControl>
        </DialogContent>
      </Box>
    </Dialog>
  );
};

export default AgeDialog;
