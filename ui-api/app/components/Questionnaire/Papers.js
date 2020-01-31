import { FormControlLabel, FormControl, RadioGroup } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

import { StyledPaper } from "./styles/paper";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    width: "100%",
    flexDirection: "row",
    justifyContent: "center"
  }
}));

const renderPaper = ({ options, input, ...rest }) => {
  const customClasses = useStyles();

  return (
    <FormControl>
      <RadioGroup {...input} {...rest} className={customClasses.root}>
        {options.map((choice, index) => (
          <FormControlLabel
            key={choice.id}
            value={choice.id}
            control={<StyledPaper content={choice} />}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
};

export default renderPaper;
