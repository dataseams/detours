// Global modules
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormGroup from "@material-ui/core/FormGroup";
import { StyledCheckbox, checkboxStyles } from "../components/styles";

function Tours() {
  const preferences = [
    { label: "Biking tours", value: "Biking tours", state: false },
    { label: "Bus tours", value: "Bus tours", state: false },
    { label: "Walking tours", value: "Walking tours", state: false },
    { label: "Day trips", value: "Day trips", state: false },
    { label: "Boat tours", value: "Boat tours", state: false },
    { label: "Classes", value: "Classes", state: false },
    { label: "Guided tours", value: "Guided tours", state: false },
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

export default Tours;
