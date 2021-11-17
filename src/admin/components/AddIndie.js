import React, { useCallback, useReducer, useState } from "react";
import { VALIDATOR_REQUIRE } from "../../shared/components/util/validators";

import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/UIElements/Button";

import "./AddIndie.css";

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
  const [addIndieOkModalStatus, setAddIndieOkModalStatus] = useState(false);
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
      company: {
        value: "",
        isValid: false,
      },
      song: {
        value: "",
        isValid: false,
      },
      birth: {
        value: "",
        isValid: false,
      },
      description: {
        value: "",
        isValid: false,
      },
      soundcloud: {
        value: "",
        isValid: false,
      },
      instagram: {
        value: "",
        isValid: false,
      },
      youtube: {
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
          company: formState.inputs.company.value,
          song: formState.inputs.song.value,
          birth: formState.inputs.birth.value,
          description: formState.inputs.description.value,
          soundcloud: formState.inputs.soundcloud.value,
          instagram: formState.inputs.instagram.value,
          youtube: formState.inputs.youtube.value,
        }),
      });

      if (!response.ok) {
        throw new Error("response is not ok");
      }
    } catch (err) {
      console.log(err);
      setError(err.message || "Something went wrong, please try again");
    }

    setAddIndieOkModalStatus(true);
  };

  const addIndieOkBtnHandler = (event) => {
    event.preventDefault();
    props.onSubmit();
  };

  //number, name, imageUrl, description, sns
  return (
    <div>
      {!addIndieOkModalStatus && (
        <div className="addIndie-modal">
          {/* <div className="addIndie-modal-form"> */}
          <form
            className="addIndie-modal-form"
            onSubmit={addIndieSubmitHandler}
          >
            <div className="addIndie-modal-form__input">
              <span>Number : </span>
              <Input
                element="input"
                id="numberString"
                type="text"
                validators={[VALIDATOR_REQUIRE()]}
                onInput={inputHandler}
              />
            </div>
            <div className="addIndie-modal-form__input">
              <span>Name : </span>
              <Input
                element="input"
                id="name"
                type="text"
                validators={[VALIDATOR_REQUIRE()]}
                onInput={inputHandler}
              />
            </div>
            <div className="addIndie-modal-form__input">
              <span>ImageUrl : </span>
              <Input
                element="input"
                id="imageUrl"
                type="text"
                validators={[VALIDATOR_REQUIRE()]}
                onInput={inputHandler}
              />
            </div>
            <div className="addIndie-modal-form__input">
              <span>Company : </span>
              <Input
                element="input"
                id="company"
                type="text"
                validators={[VALIDATOR_REQUIRE()]}
                onInput={inputHandler}
              />
            </div>
            <div className="addIndie-modal-form__input">
              <span>Song : </span>
              <Input
                element="input"
                id="song"
                type="text"
                validators={[VALIDATOR_REQUIRE()]}
                onInput={inputHandler}
              />
            </div>
            <div className="addIndie-modal-form__input">
              <span>Birth : </span>
              <Input
                element="input"
                id="birth"
                type="input"
                validators={[VALIDATOR_REQUIRE()]}
                onInput={inputHandler}
              />
            </div>
            <div className="addIndie-modal-form__input">
              <span>Description : </span>
              <Input
                element="textarea"
                id="description"
                type="textarea"
                validators={[VALIDATOR_REQUIRE()]}
                onInput={inputHandler}
              />
            </div>
            <div className="addIndie-modal-form__input">
              <span>Soundcloud : </span>
              <Input
                element="input"
                id="soundcloud"
                type="text"
                validators={[VALIDATOR_REQUIRE()]}
                onInput={inputHandler}
              />
            </div>
            <div className="addIndie-modal-form__input">
              <span>Instagram : </span>
              <Input
                element="input"
                id="instagram"
                type="text"
                validators={[VALIDATOR_REQUIRE()]}
                onInput={inputHandler}
              />
            </div>
            <div className="addIndie-modal-form__input">
              <span>Youtube : </span>
              <Input
                element="input"
                id="youtube"
                type="text"
                validators={[VALIDATOR_REQUIRE()]}
                onInput={inputHandler}
              />
            </div>
            <Button disabled={!formState.isValid}>Add</Button>
          </form>
        </div>
      )}
      {addIndieOkModalStatus && (
        <div className="addIndie-Ok-modal">
          <div className="addIndie-Ok-modal-form">
            <div>{formState.inputs.name.value}의 등록이 완료되었습니다.</div>
            <Button onClick={addIndieOkBtnHandler}>OK</Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddIndie;
