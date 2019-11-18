// Global modules
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormGroup from "@material-ui/core/FormGroup";
import { StyledCheckbox, checkboxStyles } from "../styles";

function Museums() {
  const preferences = [
    { label: "History", value: "History", state: false },
    { label: "Science", value: "Science", state: false },
    { label: "Art", value: "Art", state: false },
    { label: "Design", value: "Design", state: false },
    { label: "War", value: "War", state: false },
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

export default Museums;
