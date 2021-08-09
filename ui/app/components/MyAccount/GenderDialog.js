import React from "react";
import {
  Select,
  InputLabel,
  FormControl,
  MenuItem,
  Box,
  Button,
} from "@material-ui/core";
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

const GenderDialog = ({ open, handleDialog, handleSaveGender, UserGender }) => {
  const classes = useStyles();
  const [gender, setGender] = React.useState(UserGender);
  const [disableButton, setDisableButton] = React.useState(
    UserGender ? false : true
  );
  const handleChange = (event) => {
    setDisableButton(false);
    setGender(event.target.value);
  };
  const onHandleSubmit = () => {
    console.log(gender,"gender")
    handleSaveGender(gender);
    handleDialog();
  };

  return (
    <Dialog
      onClose={handleDialog}
      aria-labelledby="simple-title"
      open={open}
      className={classes.dialog}
      fullWidth
      maxWidth="sm"
    >
      <Box p={[0, 3, 3, 3]}>
        <DialogTitle>What is your gender?</DialogTitle>
        <DialogContent>
          <FormControl fullWidth variant="outlined">
            <InputLabel id="demo-simple-select-filled-label">Gender</InputLabel>
            <Select
              value={gender}
              variant="outlined"
              label="Gender"
              onChange={handleChange}
            >
              <MenuItem value="male">Male</MenuItem>
              <MenuItem value="female">Female</MenuItem>
            </Select>
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
                disabled={disableButton}
                onClick={onHandleSubmit}
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

export default GenderDialog;
