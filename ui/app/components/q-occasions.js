// Global modules
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
// Local modules
import { StyledRadio } from "../components/styles";

function Occasion() {
  let occasions = [
    { label: "Honeymoon", value: "Honeymoon" },
    { label: "Babymoon", value: "Babymoon" },
    { label: "Anniversary", value: "Anniversary" },
    { label: "Weekend getaway", value: "Weekend getaway" },
    { label: "Business trip", value: "Business trip" },
    { label: "Trip with friends", value: "Trip with friends" },
    { label: "Birthday", value: "Birthday" },
    { label: "Family vacation", value: "Family vacation" },
    { label: "Other", value: "Other" }
  ];

  return (
    <RadioGroup defaultValue="Honeymoon">
      {occasions.map((choice, index) => (
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

export default Occasion;
