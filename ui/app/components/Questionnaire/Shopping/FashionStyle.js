import { Field } from "redux-form";
import { makeStyles } from "@material-ui/styles";

import renderCheckbox from "../Checkbox";

const fashionStyleOptions = [
  { name: "Classic", id: "shopping.fashionStyle.classic" },
  { name: "Trendy", id: "shopping.fashionStyle.trendy" },
  { name: "Edgy", id: "shopping.fashionStyle.edgy" },
  { name: "Business", id: "shopping.fashionStyle.business" },
  { name: "Formal", id: "shopping.fashionStyle.formal" },
];

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
  },
}));

const FashionStylesField = (props) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {fashionStyleOptions.map((choice, index) => (
        <Field
          key={choice.id}
          name={choice.id}
          component={renderCheckbox}
          label={choice.name}
        />
      ))}
    </div>
  );
};

export default FashionStylesField;
