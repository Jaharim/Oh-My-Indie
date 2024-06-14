import React, { useCallback, useContext, useReducer, useState } from 'react';
import { useHistory } from 'react-router';

import './Auth.css';

import Input from '../../shared/components/FormElements/Input';
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
} from '../../shared/components/util/validators';
import { AuthContext } from '../../shared/components/context/auth-context';
import Button from '../../shared/components/UIElements/Button';
import ErrorModal from '../../shared/components/error/ErrorModal';
import Loading from '../../shared/components/UIElements/Loading';

const formReducer = (state, action) => {
  switch (action.type) {
    case 'INPUT_CHANGE':
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

const Auth = () => {
  const history = useHistory();
  const [loadingSpinner, setLoadingSpinner] = useState(false);
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState();
  const auth = useContext(AuthContext);
  const [formState, dispatch] = useReducer(formReducer, {
    inputs: {
      email: {
        value: '',
        isValid: false,
      },
      password: {
        value: '',
        isValid: false,
      },
    },
    isValid: false,
  });

  const inputHandler = useCallback((id, value, isValid) => {
    dispatch({
      type: 'INPUT_CHANGE',
      value: value,
      isValid: isValid,
      inputId: id,
    });
  }, []);

  const errorModalCloseHandler = () => {
    setError(false);
  };

  const linkToSignupHandler = () => {
    history.push('/signup');
  };

  const authSubmitHandler = async (event) => {
    event.preventDefault();
    setLoadingSpinner(true);
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/auth/login`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: formState.inputs.email.value,
            password: formState.inputs.password.value,
          }),
        }
      );

      const responseData = await response.json();

      if (!response.ok) {
        setLoadingSpinner(false);
        throw new Error(responseData.message);
      }
      if (response.ok) {
        if (
          formState.inputs.email.value ===
          `${process.env.REACT_APP_ADMIN_EMAIL}`
        )
          auth.login(responseData.userId, responseData.token, 'admin');
        else auth.login(responseData.userId, responseData.token, 'user');
      }

      setLoadingSpinner(false);
      history.replace('/');
    } catch (err) {
      setErrorMsg(err.message);
      setError(true);
    }
  };

  /*  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      authSubmitHandler();
    }
  }; */

  return (
    <React.Fragment>
      {error && (
        <ErrorModal errorMsg={errorMsg} onClose={errorModalCloseHandler} />
      )}
      <div className='login-form'>
        <div className='login-form__container'>
          {loadingSpinner && <Loading />}

          <h2>로그인</h2>

          <form className='login-form-input-form'>
            <div className='login-form-input__container'>
              <span>이메일 </span>
              <Input
                element='input'
                id='email'
                type='email'
                value={'test@test.com'}
                validators={[VALIDATOR_EMAIL()]}
                onInput={inputHandler}
                onKeyDown={authSubmitHandler}
              />
            </div>
            <div className='login-form-input__container'>
              <span>비밀번호 </span>
              <Input
                element='input'
                id='password'
                type='password'
                value={'test1'}
                validators={[VALIDATOR_MINLENGTH(5)]}
                onInput={inputHandler}
                onKeyDown={authSubmitHandler}
              />
            </div>
          </form>
          <div className='login-form-button__container'>
            <Button
              className='login-Btn'
              disabled={!formState.isValid}
              onClick={authSubmitHandler}
            >
              로그인
            </Button>
            <Button
              className='to-signup-Btn'
              type='button'
              onClick={linkToSignupHandler}
            >
              회원가입
            </Button>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Auth;
