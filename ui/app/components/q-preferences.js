// Global modules
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormGroup from "@material-ui/core/FormGroup";
import { StyledCheckbox, checkboxStyles } from "../components/styles";


function Preferences() {
  const preferences = [
    { label: "Food & beverages", value: "Food & beverages", state: true },
    {
      label: "Must see attractions",
      value: "Must see attractions",
      state: false
    },
    { label: "Museums", value: "Museums", state: false },
    {
      label: "Historical buildings",
      value: "Historical buildings",
      state: false
    },
    { label: "Spas & wellness", value: "Spas & wellness", state: false },
    { label: "Outdoors", value: "Outdoors", state: false },
    { label: "Tours", value: "Tours", state: false },
    { label: "Local culture", value: "Local culture", state: false },
    { label: "Shopping", value: "Shopping", state: false },
    {
      label: "Performances & shows",
      value: "Performances & shows",
      state: false
    },
    { label: "Nightlife", value: "Nigthlife", state: false },
    { label: "Adventure sports", value: "Adventure sports", state: false }
  ];

  const myDict = {};
  for (var item of preferences) {
    myDict[item.value] = item.state;
  }

  const [state, setState] = React.useState(myDict);
  const handleChange = name => event => {
    setState({ ...state, [name]: event.target.checked });
  };
  var filtered = Object.fromEntries(
    Object.entries(state).filter(([k, v]) => v === true)
  );
  var error = Object.keys(filtered).length < 2;

  const classes = checkboxStyles();

  return (
    <FormControl error={error}>
      <FormLabel component="legend" className={classes.label}>
        Pick at least 2.
      </FormLabel>
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
    </FormControl>
  );
}

export default Preferences;
