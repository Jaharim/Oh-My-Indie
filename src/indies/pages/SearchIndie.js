import React, { useCallback, useState } from "react";

import Input from "../../shared/components/FormElements/Input";
import { VALIDATOR_REQUIRE } from "../../shared/components/util/validators";

const SearchIndie = (props) => {
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
