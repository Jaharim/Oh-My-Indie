import React, { useCallback, useContext, useReducer, useState } from "react";
import { useHistory } from "react-router";

import "./Auth.css";

import Input from "../../shared/components/FormElements/Input";
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
} from "../../shared/components/util/validators";
import Button from "../../shared/components/UIElements/Button";
import ErrorModal from "../../shared/components/error/ErrorModal";

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
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState();
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

  const errorModalCloseHandler = () => {
    setError(false);
  };

  const authSubmitHandler = async (event) => {
    event.preventDefault();
    console.log(formState.inputs);
    try {
      setIsLoading(true);

      const response = await fetch("http://localhost:5000/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formState.inputs.email.value,
          password: formState.inputs.password.value,
          nickname: formState.inputs.nickname.value,
        }),
      });

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.message);
      }
      history.replace("/auth");
    } catch (err) {
      setErrorMsg(err.message);
      setError(true);
    }
  };

  return (
    <React.Fragment>
      {error && (
        <ErrorModal errorMsg={errorMsg} onClose={errorModalCloseHandler} />
      )}
      <div className="login-form">
        <div className="login-form__container">
          <h2>회원가입</h2>

          <form onSubmit={authSubmitHandler}>
            <div className="signup-form-input__container">
              <span>닉네임 : </span>
              <Input
                element="input"
                id="nickname"
                type="nickname"
                validators={[VALIDATOR_MINLENGTH(2)]}
                errorText="Please enter a valid nickname."
                onInput={inputHandler}
              />
            </div>
            <div className="signup-form-input__container">
              <span>이메일 : </span>
              <Input
                element="input"
                id="email"
                type="email"
                validators={[VALIDATOR_EMAIL()]}
                errorText="Please enter a valid email address."
                onInput={inputHandler}
              />
            </div>
            <div className="signup-form-input__container">
              <span>비밀번호 : </span>
              <Input
                element="input"
                id="password"
                type="password"
                validators={[VALIDATOR_MINLENGTH(5)]}
                errorText="Please enter a valid password, at least 5 characters."
                onInput={inputHandler}
              />
            </div>
            <Button className="signup-Btn" disabled={!formState.isValid}>
              가입
            </Button>
          </form>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Signup;
