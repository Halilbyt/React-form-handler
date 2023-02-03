import React, { useState, useRef, useEffect } from "react";
import CustomInput from "./CustomInput";
import classes from "./FormBasic.module.css";

const FromBasic = () => {
  const [value, setValue] = useState("");
  const [isTyped, setIsTyped] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const [enteredValue, setEnteredValue] = useState(false);
  const [email, setEmail] = useState("");
  const [emailValid, setEmailValid] = useState(false);
  const [warningText, setWarningText] = useState(false);
  const [focusEmail, setFocusEmail] = useState(false);
  const [validClass, setValidClass] = useState("input");

  const inputRef = useRef();
  let inputValue = "";
  let setInputRef = "";

  const inputChangeHandler = (value) => {
    inputValue = value;
    setIsTyped(true);
    if (value !== "") {
      setEnteredValue(true);
    } else {
      setEnteredValue(false);
    }
  };

  // onClick Handler
  const getDataHandler = (e) => {
    e.preventDefault();
    if (inputValue.length !== 0 && email.length !== 0) {
      setValue(inputValue);
      setInputRef = inputRef.current.value;
      setWarningText(false);
    }

    if (value === "" && email === "") {
      console.log("invalid area");
      setWarningText(true);
      setIsValid(false);
      setEnteredValue(false);
      setValidClass((prev) => "inputInvalid");
      return;
    }
    if (email !== "" && value === "") {
      setWarningText(true);
      setIsValid(false);
      setEnteredValue(false);
      setValidClass((prev) => "input");
      return;
    }
    if (email === "" && value !== "") {
      setWarningText(true);
      setIsValid(true);
      setEnteredValue(true);
      setValidClass((prev) => "inputInvalid");
      return;
    }

    setIsValid(true);
  };

  // focus on name Input
  const loseFocusHandler = () => {
    setIsTyped(true);
  };

  // focus on email Input
  const emailInputFocusHandler = () => {
    setFocusEmail(true);
  };

  const inputEmailChangeHandler = (e) => {
    setEmail(e.target.value);
    if (email !== "") {
      setEmailValid(true);
    } else {
      setEmailValid(false);
    }
  };

  useEffect(() => {
    if ((!emailValid && focusEmail) || (isTyped && !isValid)) {
      setWarningText(true);
    }

    if (emailValid && email !== "") {
      setValidClass("input");
    }

    if (!emailValid && focusEmail && email === "") {
      setValidClass((prev) => "inputInvalid");
    }
  }, [emailValid, focusEmail, isTyped, isValid]);

  return (
    <form className={classes.formContainer}>
      <CustomInput
        ref={inputRef}
        changeValue={inputChangeHandler}
        loseFocus={loseFocusHandler}
        isDataTyped={isTyped}
        isDataValid={isValid}
        enteredValue={enteredValue}
        warningText={warningText}
      />
      <input
        type="email"
        className={classes[validClass]}
        placeholder="Enter E-mail"
        onChange={inputEmailChangeHandler}
        onBlur={emailInputFocusHandler}
        required
      />
      <button className={classes.submit} type="submit" onClick={getDataHandler}>
        Submit
      </button>
      {warningText && (
        <p className={classes.invalid}>
          Please type input, you must enter some value!
        </p>
      )}
    </form>
  );
};

export default FromBasic;
