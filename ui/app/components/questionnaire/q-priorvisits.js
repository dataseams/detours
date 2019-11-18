// Global modules
import FormControlLabel from "@material-ui/core/FormControlLabel";
import RadioGroup from "@material-ui/core/RadioGroup";
// Local modules
import { StyledRadio } from "../styles";

function PriorVisit() {
  let priorvisits = [
    { label: "Never", value: "Never" },
    { label: "One time", value: "One time" },
    { label: "Many times", value: "Many times" }
  ];

  return (
    <RadioGroup defaultValue="Never">
      {priorvisits.map((choice, index) => (
        <FormControlLabel
          key={choice.value}
          value={choice.value}
          control={<StyledRadio />}
          label={choice.label}
        />
      ))}
    </RadioGroup>
  );
}

export default PriorVisit;
