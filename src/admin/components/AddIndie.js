import React, { useCallback, useReducer, useState } from "react";
import { VALIDATOR_REQUIRE } from "../../shared/components/util/validators";

import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/UIElements/Button";

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

const AddIndie = (props) => {
  const [error, setError] = useState();
  const [formState, dispatch] = useReducer(formReducer, {
    inputs: {
      numberString: {
        value: "",
        isValid: false,
      },
      name: {
        value: "",
        isValid: false,
      },
      imageUrl: {
        value: "",
        isValid: false,
      },
      description: {
        value: "",
        isValid: false,
      },
      sns: {
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

  const addIndieSubmitHandler = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(`http://localhost:5000/admin/addIndie`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          numberString: formState.inputs.numberString.value,
          name: formState.inputs.name.value,
          imageUrl: formState.inputs.imageUrl.value,
          description: formState.inputs.description.value,
          sns: formState.inputs.sns.value,
        }),
      });

      if (!response.ok) {
        throw new Error("response is not ok");
      }
    } catch (err) {
      console.log(err);
      setError(err.message || "Something went wrong, please try again");
    }

    props.onSubmit();
  };

  //number, name, imageUrl, description, sns
  return (
    <div>
      <div>
        <form onSubmit={addIndieSubmitHandler}>
          <Input
            element="input"
            id="numberString"
            type="text"
            label="Number : "
            validators={[VALIDATOR_REQUIRE()]}
            onInput={inputHandler}
          />
          <Input
            element="input"
            id="name"
            type="text"
            label="Name : "
            validators={[VALIDATOR_REQUIRE()]}
            onInput={inputHandler}
          />
          <Input
            element="input"
            id="imageUrl"
            type="text"
            label="imageUrl : "
            validators={[VALIDATOR_REQUIRE()]}
            onInput={inputHandler}
          />
          <Input
            element="textarea"
            id="description"
            type="textarea"
            label="description : "
            validators={[VALIDATOR_REQUIRE()]}
            onInput={inputHandler}
          />
          <Input
            element="textarea"
            id="sns"
            type="textarea"
            label="sns : "
            validators={[VALIDATOR_REQUIRE()]}
            onInput={inputHandler}
          />
          <Button disabled={!formState.isValid}>Add</Button>
        </form>
      </div>
    </div>
  );
};

export default AddIndie;
