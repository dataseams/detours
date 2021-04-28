import { FormControlLabel } from "@material-ui/core";

import { StyledCheckbox } from "./styles/checkbox";

const renderCheckbox = ({ input, label }) => {
  return (
    <FormControlLabel
      control={
        <StyledCheckbox
          checked={input.value ? true : false}
          onChange={input.onChange}
        />
      }
      label={label}
    />
  );
};

export default renderCheckbox;
