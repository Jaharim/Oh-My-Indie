import React, { useCallback, useState } from "react";

import Input from "../../shared/components/FormElements/Input";
import { VALIDATOR_REQUIRE } from "../../shared/components/util/validators";
import { useHistory } from "react-router";

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
    <div>
      <h1> Search Your Indie !</h1>
      <form onSubmit={searchSubmitHandler}>
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
      <h1>Somebody's Indie</h1>
      <h2>Random Indie's Name</h2>
      <h3>Like</h3>
      <h3>Bookmark</h3>
    </div>
  );
};

export default SearchIndie;
