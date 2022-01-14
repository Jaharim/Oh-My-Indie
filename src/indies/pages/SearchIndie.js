import React, { useCallback, useContext, useEffect, useState } from "react";

import "./SearchIndie.css";

import Input from "../../shared/components/FormElements/Input";
import { VALIDATOR_REQUIRE } from "../../shared/components/util/validators";
import { useHistory } from "react-router";
import RandomIndie from "../components/RandomIndie";
import Card from "../../shared/components/UIElements/Card";
import Button from "../../shared/components/UIElements/Button";
import { AuthContext } from "../../shared/components/context/auth-context";
import ErrorModal from "../../shared/components/error/ErrorModal";

const SearchIndie = (props) => {
  const auth = useContext(AuthContext);
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState();
  const history = useHistory();
  const [randomIndie, setRandomIndie] = useState({
    name: "",
    image: "",
    like: 0,
  });
  const [formState, setFormState] = useState({
    value: "",
    isValid: false,
  });

  const indieInputHandler = useCallback((id, value, isValid) => {
    setFormState({
      value: value,
      isValid: isValid,
      inputId: id,
    });
  }, []);

  const errorModalCloseHandler = () => {
    setError(false);
    if (!auth.isLoggedIn) history.replace(`/auth/`);
  };

  useEffect(() => {
    const getRandomIndieInformation = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/indie`
        );

        const responseData = await response.json();

        setRandomIndie({
          name: responseData.name,
          image: responseData.image,
          like: responseData.like,
        });

        if (!response.ok) {
          throw new Error(responseData.message);
        }
      } catch (err) {
        setErrorMsg(err.message);
        setError(true);
      }
    };
    getRandomIndieInformation();
  }, []);

  const searchSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/indie/${formState.value}`,
        {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        }
      );

      const responseData = await response.json();

      if (!response.ok) {
        console.log(responseData.message);
        history.replace(`/indie/`);
        throw new Error(responseData.message);
      } else {
        history.replace(`/indie/${formState.value}`);
      }
    } catch (err) {
      setErrorMsg(err.message);
      setError(true);
    }
  };

  const randomIndieClickHandler = (event) => {
    if (auth.isLoggedIn) {
      history.replace(`/indie/${randomIndie.name}`);
    } else {
      setErrorMsg("로그인 후 이용해주세요.");
      setError(true);
    }
  };

  return (
    <React.Fragment>
      {error && (
        <ErrorModal errorMsg={errorMsg} onClose={errorModalCloseHandler} />
      )}
      <div className="search__container">
        <div className="search-card">
          <div className="search__mine-container">
            <div className="search__mine-header">
              <h1> 당신의 Indie,</h1>
              <form
                className="search__mine-form"
                onSubmit={searchSubmitHandler}
              >
                <Input
                  id="indieTitle"
                  element="input"
                  type="text"
                  label=""
                  validators={[VALIDATOR_REQUIRE()]}
                  errorText="Please enter a valid name"
                  onInput={indieInputHandler}
                />
                <Button className={"search-Btn"} disabled={!formState.isValid}>
                  <span role="img" aria-label="search">
                    🔍
                  </span>
                </Button>
              </form>
            </div>
          </div>
        </div>
        <div className="search-card__random">
          <div className="search__somebody-container">
            <div className="search__somebody-header">
              <h1>다른 누군가의 Indie,</h1>
            </div>
            <RandomIndie
              name={randomIndie.name}
              image={randomIndie.image}
              likeNumber={randomIndie.like}
              onClick={randomIndieClickHandler}
            />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default SearchIndie;
