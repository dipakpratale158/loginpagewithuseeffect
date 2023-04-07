import React, { useEffect, useState } from "react";

import Card from "../UI/Card/Card";
import classes from "./Login.module.css";
import Button from "../UI/Button/Button";

const Login = (props) => {
  const [enteredEmail, setEnteredEmail] = useState("");
  const [emailIsValid, setEmailIsValid] = useState();
  const [enteredcolname, setEnteredcolname] = useState("");
  const [colnameIsValid, setcolnameIsValid] = useState();
  const [enteredPassword, setEnteredPassword] = useState("");
  const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);

  // useEffect(() => {
  //   console.log("efect running");  //then run
  //   return () => {
  //     console.log("after running"); //first run
  //   };
  // }, [enteredPassword]);

  // useEffect(() => {
  //   console.log("efect running"); //then run
  //   return () => {
  //     console.log("after running"); //first run
  //   };
  // }, []);

  useEffect(() => {
    const val = setTimeout(() => {
      console.log("done");
      setFormIsValid(
        enteredEmail.includes("@") &&
          enteredPassword.trim().length > 6 &&
          enteredcolname.trim().length !== 0
      );
    }, 500);

    return () => {
      console.log("cleane");
      clearTimeout(val);
    };
  }, [enteredEmail, enteredPassword, enteredcolname]);

  const emailChangeHandler = (event) => {
    setEnteredEmail(event.target.value);

    setFormIsValid(
      event.target.value.includes("@") &&
        enteredPassword.trim().length > 6 &&
        enteredcolname.trim().length !== 0
    );
  };

  const colnameChangeHandler = (event) => {
    setEnteredcolname(event.target.value);

    setFormIsValid(
      event.target.value.trim().length !== 0 &&
        enteredEmail.includes("@") &&
        enteredPassword.trim().length > 6
    );
  };

  const passwordChangeHandler = (event) => {
    setEnteredPassword(event.target.value);

    setFormIsValid(
      event.target.value.trim().length > 6 &&
        enteredEmail.includes("@") &&
        enteredcolname.trim().length !== 0
    );
  };

  const validateEmailHandler = () => {
    setEmailIsValid(enteredEmail.includes("@"));
  };

  const validatecolnameHandler = () => {
    setcolnameIsValid(enteredcolname.trim().length !== 0);
  };

  const validatePasswordHandler = () => {
    setPasswordIsValid(enteredPassword.trim().length > 6);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(enteredEmail, enteredPassword, enteredcolname);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            emailIsValid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={enteredEmail}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            colnameIsValid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="colname">colname</label>
          <input
            type="text"
            id="text"
            value={enteredcolname}
            onChange={colnameChangeHandler}
            onBlur={validatecolnameHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            passwordIsValid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={enteredPassword}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
