import {FormHelperText} from "@material-ui/core";

const renderFormHelper = ({ touched, error }) => {
  if (!(touched && error)) {
    return;
  } else {
    return <FormHelperText>{touched && error}</FormHelperText>;
  }
};

export default renderFormHelper;
