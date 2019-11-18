// Global modules
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormGroup from "@material-ui/core/FormGroup";
import { StyledCheckbox, checkboxStyles } from "../styles";

function AdventureSports() {
  const preferences = [
    { label: "Kayaking", value: "Kayaking", state: false },
    { label: "Rafting/Tubing", value: "Rafting/Tubing", state: false },
    { label: "Skydiving", value: "Skydiving", state: false },
    { label: "Diving/Snorkeling", value: "Diving/Snorkeling", state: false },
    { label: "Ziplining", value: "Ziplining", state: false },
    { label: "Mountain biking", value: "Mountain biking", state: false },
    { label: "Paragliding", value: "Paragliding", state: false },
    { label: "Surfing", value: "Surfing", state: false },
    { label: "Skiing", value: "Skiing", state: false },
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

export default AdventureSports;
