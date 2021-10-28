import React, { useCallback, useContext, useReducer, useState } from "react";

import "./Auth.css";

import Input from "../../shared/components/FormElements/Input";
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
} from "../../shared/components/util/validators";

const formReducer = (state, action) => {
  switch (action.type) {
    case "INPUT_CHANGE":
      let formIsValid = true;
      for (const inputId in state.inputs) {
        if (inputId === action.inputId) {
          formIsValid = formIsValid && action.isValid;
        } else {
          formIsValid = formIsValid && state.inputs[inputId].isValid;
        }
      }
      return {
        ...state,
        inputs: {
          ...state.inputs,
          [action.inputId]: { value: action.value, isValid: action.isValid },
        },
        isValid: formIsValid,
      };

    default:
      return state;
  }
};

const Signup = () => {
  const [formState, dispatch] = useReducer(formReducer, {
    inputs: {
      nickname: {
        value: "",
        isValid: false,
      },
      email: {
        value: "",
        isValid: false,
      },
      password: {
        value: "",
        isValid: false,
      },
    },
    isValid: false,
  });

  const inputHandler = useCallback((id, value, isValid) => {
    dispatch({
      type: "INPUT_CHANGE",
      value: value,
      isValid: isValid,
      inputId: id,
    });
  }, []);

  const authSubmitHandler = (event) => {
    event.preventDefault();
    console.log(formState.inputs);
  };

  return (
    <div className="login-form">
      <div className="login-form__container">
        <h2>회원가입</h2>

        <form onSubmit={authSubmitHandler}>
          <Input
            element="input"
            id="nickname"
            type="nickname"
            label="닉네임 : "
            validators={[VALIDATOR_MINLENGTH(2)]}
            errorText="Please enter a valid nickname."
            onInput={inputHandler}
          />
          <Input
            element="input"
            id="email"
            type="email"
            label="E-mail : "
            validators={[VALIDATOR_EMAIL()]}
            errorText="Please enter a valid email address."
            onInput={inputHandler}
          />
          <Input
            element="input"
            id="password"
            type="password"
            label="password : "
            validators={[VALIDATOR_MINLENGTH(5)]}
            errorText="Please enter a valid password, at least 5 characters."
            onInput={inputHandler}
          />
          <button type="submit" disabled={!formState.isValid}>
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
