import clsx from "clsx";
import { makeStyles, RadioGroup, Radio } from "@material-ui/core";
import FormControlLabel from "@material-ui/core/FormControlLabel";

const radioStyles = makeStyles({
  root: {
    "&:hover": {
      backgroundColor: "transparent"
    }
  },
  icon: {
    borderRadius: "50%",
    width: 16,
    height: 16,
    boxShadow:
      "inset 0 0 0 1px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.1)",
    backgroundColor: "#f5f8fa",
    backgroundImage:
      "linear-gradient(180deg,hsla(0,0%,100%,.8),hsla(0,0%,100%,0))",
    "$root.Mui-focusVisible &": {
      outline: "2px auto rgba(19,124,189,.6)",
      outlineOffset: 2
    },
    "input:hover ~ &": {
      backgroundColor: "#ebf1f5"
    },
    "input:disabled ~ &": {
      boxShadow: "none",
      background: "rgba(206,217,224,.5)"
    }
  },
  checkedIcon: {
    backgroundColor: "#606DC3",
    backgroundImage:
      "linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))",
    "&:before": {
      display: "block",
      width: 16,
      height: 16,
      backgroundImage: "radial-gradient(#fff,#fff 28%,transparent 32%)",
      content: '""'
    },
    "input:hover ~ &": {
      backgroundColor: "#106ba3"
    }
  }
});

function StyledRadio(props) {
  const classes = radioStyles();

  return (
    <Radio
      className={classes.root}
      disableRipple
      color="default"
      checkedIcon={<span className={clsx(classes.icon, classes.checkedIcon)} />}
      icon={<span className={classes.icon} />}
      {...props}
    />
  );
}

function Occasion() {
  const classes = radioStyles();

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
