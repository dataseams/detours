import React from "react";
import { makeStyles } from "@material-ui/styles";
import { useMutation } from "@apollo/react-hooks";
import { Box, Typography } from "@material-ui/core";
import { useSelector } from "react-redux";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import DELETE_USER from "../../utils/queries/DeleteUser";

const useStyles = makeStyles((theme) => ({
  heading: {
    fontSize: "26px",
    fontWeight: "600",
    color: theme.typography.color,
    marginBottom: "25px",
  },
  subHeading: {
    fontSize: "18px",
    color: theme.typography.color,
    fontWeight: "500",
  },
  button: {
    textTransform: "capitalize",
    padding: "10px 30px",
    fontWeight: "400",
  },
}));

const BeforeYouGo = ({ handleListItemClick }) => {
  const classes = useStyles();
  const userEmail = useSelector((state) => state.user.email);
  const [leavingReason, setLeavingReason] = React.useState("1");
  const [improvement, setImprovement] = React.useState("");
  const [deleteUser, { data }] = useMutation(DELETE_USER, {});
  const handleRadioButton = (e) => {
    setLeavingReason(e.target.value);
  };
  const handleTextInput = (e) => {
    setImprovement(e.target.value);
  };
  const HandleDeleteMyAccount = (e) => {
    handleListItemClick(e, 2);
    const variables = { leavingReason, improvement, email: userEmail };
    deleteUser({
      variables: variables,
    });
  };
  console.log(data, "data");
  return (
    <Box>
      <Typography className={classes.heading}>Before you go...</Typography>
      <Box mb={1}>
        <Typography className={classes.subHeading}>
          Tell us why you're leaving: *
        </Typography>
      </Box>
      <Box>
        <RadioGroup
          aria-label="gender"
          name="gender1"
          value={leavingReason}
          onChange={handleRadioButton}
        >
          <FormControlLabel
            value="1"
            control={<Radio color="primary" />}
            label="I have a duplicate account"
          />
          <FormControlLabel
            value="2"
            control={<Radio color="primary" />}
            label="It's too expensive"
          />
          <FormControlLabel
            value="3"
            control={<Radio color="primary" />}
            label="I'm not getting enough value"
          />
          <FormControlLabel
            value="4"
            control={<Radio color="primary" />}
            label="I have a privacy concern"
          />
        </RadioGroup>
      </Box>
      <Box mt={3}>
        <Box>
          <Typography className={classes.subHeading}>
            What should we improve?
          </Typography>
        </Box>
        <Box my={3} width={[1, 1, 0.8, 0.8]}>
          <TextField
            id="outlined-multiline-static"
            multiline
            rows={4}
            onChange={handleTextInput}
            fullWidth
            variant="outlined"
          />
        </Box>
      </Box>
      <Box width={[1, 1, 0.4, 0.3]}>
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          fullWidth
          onClick={HandleDeleteMyAccount}
        >
          Delete my account
        </Button>
      </Box>
    </Box>
  );
};

export default BeforeYouGo;
