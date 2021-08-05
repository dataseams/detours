import React, { useState } from "react";
import { FormControl, TextField, Box, Button } from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import { makeStyles } from "@material-ui/core/styles";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";

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

const AgeDialog = ({ open, handleDialog }) => {
  const classes = useStyles();
  const [error, setError] = useState(false);
  const handleAge = (e) => {
    let value = e.target.value;
    value < 0 ? setError(true) : setError(false);
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
                className={classes.saveButton}
                variant="contained"
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
