import { Field } from "redux-form";
import { makeStyles } from "@material-ui/styles";

import renderCheckbox from "../Checkbox";

const storeTypeOptions = [
  { name: "Department stores", id: "shopping.storeType.departmentStore" },
  { name: "Boutiques", id: "shopping.storeType.boutiques" },
  { name: "Markets", id: "shopping.storeType.markets" },
  { name: "Gift shops", id: "shopping.storeType.giftShops" },
  { name: "Shopping centers", id: "shopping.storeType.shoppingCenters" },
  { name: "Thrift shops/Vintage", id: "shopping.storeType.thriftShopsVintage" },
];

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
  },
}));

const StoreTypesField = (props) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {storeTypeOptions.map((choice, index) => (
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

export default StoreTypesField;
