import React, { useCallback, useReducer, useState, useContext } from "react";
import { useHistory } from "react-router";

import "./Auth.css";

import Input from "../../shared/components/FormElements/Input";
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
} from "../../shared/components/util/validators";
import Button from "../../shared/components/UIElements/Button";
import ErrorModal from "../../shared/components/error/ErrorModal";
import { AuthContext } from "../../shared/components/context/auth-context";
import Loading from "../../shared/components/UIElements/Loading";

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
  const auth = useContext(AuthContext);
  const history = useHistory();
  const [error, setError] = useState(false);
  const [loadingSpinner, setLoadingSpinner] = useState(false);
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
    setLoadingSpinner(true);
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/auth/signup`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: formState.inputs.email.value,
            password: formState.inputs.password.value,
            nickname: formState.inputs.nickname.value,
          }),
        }
      );

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.message);
      }
      setLoadingSpinner(false);
      auth.login(responseData.userId, responseData.token, "user");
      history.replace("/");
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
      <form className="login-form" onSubmit={authSubmitHandler}>
        <div className="login-form__container">
          {loadingSpinner && <Loading />}
          <h2>회원가입</h2>

          <div className="login-form-input-form">
            <div className="signup-form-input__container">
              <span>닉네임</span>
              <Input
                element="input"
                id="nickname"
                type="nickname"
                validators={[VALIDATOR_MINLENGTH(2)]}
                errorText="Please enter a valid nickname."
                onInput={inputHandler}
                placeholder={"2글자 이상"}
              />
            </div>
            <div className="signup-form-input__container">
              <span>이메일</span>
              <Input
                element="input"
                id="email"
                type="email"
                validators={[VALIDATOR_EMAIL()]}
                errorText="Please enter a valid email address."
                onInput={inputHandler}
                placeholder={"example@example.com"}
              />
            </div>
            <div className="signup-form-input__container">
              <span>비밀번호</span>
              <Input
                element="input"
                id="password"
                type="password"
                validators={[VALIDATOR_MINLENGTH(5)]}
                errorText="Please enter a valid password, at least 5 characters."
                onInput={inputHandler}
                placeholder={"5글자 이상"}
              />
            </div>
            <Button className="signup-Btn" disabled={!formState.isValid}>
              가입
            </Button>
          </div>
        </div>
      </form>
    </React.Fragment>
  );
};

export default Signup;
