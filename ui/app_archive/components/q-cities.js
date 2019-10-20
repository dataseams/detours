import React from "react";
import Select from "react-select";

const cityOptions = [
  { value: "Paris", label: "Paris, France" },
  { value: "SF", label: "San Francisco, CA" },
  { value: "LA", label: "Los Angeles, CA" },
  { value: "Habana", label: "Habana, Cuba" },
  { value: "Other", label: "Other" }
];

function City() {
  return (
    <Select placeholder="Type or select..." options={cityOptions}></Select>
  );
};

export default City;
