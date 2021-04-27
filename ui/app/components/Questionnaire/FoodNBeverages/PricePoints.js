import React from "react";
import { Field } from "redux-form";

import renderPaper from "../Papers";

const pricePointOptions = [
  { name: "$", id: "inexpensive" },
  { name: "$$", id: "moderate" },
  { name: "$$$", id: "expensive" },
  { name: "$$$$", id: "luxury" },
];

const DiningPricePointsField = (props) => {
  const { classes } = props;

  return (
    <Field
      name="dining.pricePoint"
      classes={classes}
      component={renderPaper}
      options={pricePointOptions}
    />
  );
};

export default DiningPricePointsField;
