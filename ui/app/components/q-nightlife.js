// Global modules
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormGroup from "@material-ui/core/FormGroup";
import { StyledCheckbox, checkboxStyles } from "../components/styles";

function Nightlife() {
  const preferences = [
    { label: "Nightclubs", value: "Nightclubs", state: false },
    { label: "Cocktail bars", value: "Cocktail bars", state: false },
    { label: "Sports bars", value: "Sports bars", state: false },
    { label: "Wine bars", value: "Wine bars", state: false },
    { label: "Bottle service", value: "Bottle service", state: false },
    { label: "Dancing", value: "Dancing", state: false },
    { label: "Speakeasies", value: "Speakeasies", state: false },
    { label: "Craft beer bars", value: "Craft beer bars", state: false },
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

export default Nightlife;
