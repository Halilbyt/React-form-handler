import React from "react";
import classes from "./CustomInput.module.css";

const CustomInput = React.forwardRef((props, ref) => {
  const inputValue = (e) => {
    const value = e.target.value;
    props.changeValue(value);
  };

  let invalidClass = "input";

  if (props.isDataValid) {
    invalidClass = "input";
  } else if (props.isDataTyped && !props.isDataValid && !props.enteredValue) {
    console.log("***");
    invalidClass = "inputInvalid";
  } else if (invalidClass === "inputInvalid" && props.enteredValue) {
    console.log("İts workıiing");
    invalidClass = "input";
  } else if (!props.isDataValid && !props.enteredValue && props.warningText) {
    invalidClass = "inputInvalid";
  }

  return (
    <React.Fragment>
      <input
        onBlur={props.loseFocus}
        className={classes[invalidClass]}
        type="text"
        placeholder="Enter the Name"
        required
        onChange={inputValue}
        ref={ref}
      />
    </React.Fragment>
  );
});

export default CustomInput;
