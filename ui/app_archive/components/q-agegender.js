import React from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";

const currencies = [
  {
    value: "Female",
    label: "Female"
  },
  {
    value: "Male",
    label: "Male"
  },
  {
    value: "Other",
    label: "Other"
  }
];

const useStyles = makeStyles(theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: "45%",
    maxWidth: "90%"
  }
}));

function AgeGender() {
  const classes = useStyles();
  const [values, setValues] = React.useState({
    age: "",
    gender: ""
  });

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };

  return (
    <form className={classes.container}>
      <TextField
        id="outlined-age"
        label="Age"
        value={values.age}
        onChange={handleChange("age")}
        type="number"
        className={classes.textField}
        InputLabelProps={{
          shrink: true,
        }}
        margin="normal"
        variant="outlined"
      />
      <TextField
        id="outlined-gender"
        select
        label="Gender"
        className={classes.textField}
        value={values.gender}
        InputLabelProps={{
          shrink: true,
        }}
        onChange={handleChange("gender")}
        margin="normal"
        variant="outlined"
      >
        {currencies.map(option => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>
    </form>
  );
}

export default AgeGender;
