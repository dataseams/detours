// Global modules
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormGroup from "@material-ui/core/FormGroup";
import { StyledCheckbox, checkboxStyles } from "../styles";

function Relaxation() {
  const preferences = [
    { label: "Spa treatments", value: "Spa treatments", state: false },
    { label: "Facials", value: "Facials", state: false },
    { label: "Massages", value: "Massages", state: false },
    { label: "Bath houses", value: "Bath houses", state: false },
    { label: "Yoga", value: "Yoga", state: false },
    { label: "Downtime", value: "Downtime", state: false},
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

export default Relaxation;
