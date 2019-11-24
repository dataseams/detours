import { FormControlLabel, FormControl, RadioGroup } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

import { StyledPaper } from "./styles/paper";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%"
  }
}));

const renderPaper = ({ options, input, ...rest }) => {
  const customClasses = useStyles();

  return (
    <FormControl className={customClasses.root}>
      <RadioGroup {...input} {...rest}>
        {options.map((choice, index) => (
          <FormControlLabel
            key={choice.id}
            value={choice.id}
            control={<StyledPaper content="Hello" />}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
};

export default renderPaper;
