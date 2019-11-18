// Global modules
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormGroup from "@material-ui/core/FormGroup";
import { StyledCheckbox, checkboxStyles } from "../styles";

function Neighborhoods() {
  const preferences = [
    { label: "Placeholder 1", value: "Placeholder 1", state: false },
    { label: "Placeholder 2", value: "Placeholder 2", state: false },
    { label: "Placeholder 3", value: "Placeholder 3", state: false },
  ];

  const myDict = {};
  for (var item of preferences) {
    myDict[item.value] = item.state;
  }

  const [state, setState] = React.useState(myDict);
  const handleChange = name => event => {
    setState({ ...state, [name]: event.target.checked });
  };

  const classes = checkboxStyles();

  return (
      <FormGroup className={classes.label}>
        {preferences.map((choice, index) => (
          <FormControlLabel
            key={choice.value}
            value={choice.value}
            control={
              <StyledCheckbox
                checked={state[choice.value]}
                onChange={handleChange(choice.value)}
              />
            }
            label={choice.label}
          />
        ))}
      </FormGroup>
  );
}

export default Neighborhoods;
