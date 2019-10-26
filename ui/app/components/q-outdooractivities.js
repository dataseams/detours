// Global modules
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormGroup from "@material-ui/core/FormGroup";
import { StyledCheckbox, checkboxStyles } from "../components/styles";

function OutdoorActivities() {
  const preferences = [
    { label: "Parks/Gardens", value: "Parks/Gardens", state: false },
    { label: "Hiking", value: "Hiking", state: false },
    { label: "Natural wonders", value: "Natural wonders", state: false },
    { label: "Beaches", value: "Beaches", state: false },
    { label: "Scenic views", value: "Scenic views", state: false },
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

export default OutdoorActivities;
