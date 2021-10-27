import React, { useCallback, useState } from "react";

import "./SearchIndie.css";

import Input from "../../shared/components/FormElements/Input";
import { VALIDATOR_REQUIRE } from "../../shared/components/util/validators";
import { useHistory } from "react-router";
import SearchedIndie from "../components/SearchedIndie";
import Card from "../../shared/components/UIElements/Card";

const SearchIndie = (props) => {
  const history = useHistory();

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

  const searchSubmitHandler = (event) => {
    event.preventDefault();
    console.log(formState);
    history.replace(`/indie/${formState.value}`);
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
              <button type="submit" disabled={!formState.isValid}>
                Search
              </button>
            </form>
          </div>
          <SearchedIndie />
        </div>
      </Card>
      <Card>
        <div className="search__somebody-container">
          <div className="search__somebody-header">
            <h1>다른 누군가의 Indie,</h1>
          </div>
          <SearchedIndie />
        </div>
      </Card>
    </div>
  );
};

export default SearchIndie;
