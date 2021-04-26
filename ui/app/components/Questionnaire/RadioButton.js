import { RadioGroup, FormControl, FormControlLabel } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

import { StyledRadio } from "./styles/radio";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
}));

const renderRadioButton = ({ options, input, ...rest }) => {
  const customClasses = useStyles();

  return (
    <FormControl className={customClasses.root}>
      <RadioGroup {...input} {...rest}>
        {options.map((choice, index) => (
          <FormControlLabel
            key={choice.value}
            value={choice.value}
            control={<StyledRadio />}
            label={choice.label}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
};

export default renderRadioButton;
