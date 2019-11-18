// Global modules
import FormControlLabel from "@material-ui/core/FormControlLabel";
import RadioGroup from "@material-ui/core/RadioGroup";
// Local modules
import { StyledRadio } from "../styles";

function Companion() {
  let companions = [
    { label: "Solo", value: "Solo" },
    { label: "Significant other", value: "Significant other" },
    { label: "Friend", value: "Friend" },
    { label: "Group", value: "Group" },
    { label: "Family with kids", value: "Family with kids" },
    { label: "Other", value: "Other" }
  ];

  return (
    <RadioGroup defaultValue="Solo">
      {companions.map((choice, index) => (
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

export default Companion;
