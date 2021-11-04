import React, { useCallback, useEffect, useState } from "react";

import "./SearchIndie.css";

import Input from "../../shared/components/FormElements/Input";
import { VALIDATOR_REQUIRE } from "../../shared/components/util/validators";
import { useHistory } from "react-router";
import RandomIndie from "../components/RandomIndie";
import Card from "../../shared/components/UIElements/Card";
import Button from "../../shared/components/UIElements/Button";

const SearchIndie = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const history = useHistory();
  const [randomIndie, setRandomIndie] = useState({
    name: "",
    imageUrl: "",
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

  useEffect(() => {
    const getRandomIndieInformation = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`http://localhost:5000/indie`);

        const responseData = await response.json();

        setRandomIndie({
          name: responseData.name,
          imageUrl: responseData.imageUrl,
          like: responseData.like,
        });

        if (!response.ok) {
          throw new Error(responseData.message);
        }
      } catch (err) {
        console.log(err);
        setError(err.message || "Something went wrong, please try again");
      }

      setIsLoading(false);
    };
    getRandomIndieInformation();
  }, []);

  const searchSubmitHandler = async (event) => {
    const controller = new AbortController();
    event.preventDefault();
    console.log(formState);
    try {
      const response = await fetch(
        `http://localhost:5000/indie/${formState.value}`
      );

      if (!response.ok) {
        controller.abort();
        console.log(`Could not find ${formState.value}`);
        history.replace(`/indie/`);
      } else {
        controller.abort();
        history.replace(`/indie/${formState.value}`);
      }
    } catch (err) {
      console.log(err);
      setError(err.message || "Something went wrong, please try again");
    }
  };

  const randomIndieClickHandler = (event) => {
    history.replace(`/indie/${randomIndie.name}`);
  };

  return (
    <div className="search__container">
      <Card>
        <div className="search__mine-container">
          <div className="search__mine-header">
            <h1> 당신의 Indie,</h1>
            <form className="search__mine-form" onSubmit={searchSubmitHandler}>
              <Input
                id="indieTitle"
                element="input"
                type="text"
                label=""
                validators={[VALIDATOR_REQUIRE()]}
                errorText="Please enter a valid name"
                onInput={indieInputHandler}
              />
              <Button className={"search"} disabled={!formState.isValid}>
                🔍
              </Button>
            </form>
          </div>
        </div>
      </Card>
      <Card>
        <div className="search__somebody-container">
          <div className="search__somebody-header">
            <h1>다른 누군가의 Indie,</h1>
          </div>
          <RandomIndie
            name={randomIndie.name}
            imageUrl={randomIndie.imageUrl}
            likeNumber={randomIndie.like}
            onClick={randomIndieClickHandler}
          />
        </div>
      </Card>
    </div>
  );
};

export default SearchIndie;
