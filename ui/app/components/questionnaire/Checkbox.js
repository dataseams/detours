import { FormGroup, FormControl, FormControlLabel } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

import { StyledCheckbox } from "../styles";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%"
  }
}));

const renderCheckBox = ({ options, input, ...rest}) => {
  const customClasses = useStyles();

  return (
    <FormControl className={customClasses.root}>
      <FormGroup {...input} {...rest}>
        {options.map((choice, index) => (
          <FormControlLabel
            key={choice.id}
            value={choice.id}
            control={<StyledCheckbox />}
            label={choice.name}
          />
        ))}
      </FormGroup>
    </FormControl>
  );
};

export default renderCheckBox;
