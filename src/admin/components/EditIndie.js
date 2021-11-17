import React, { useCallback, useReducer, useState } from "react";
import { VALIDATOR_REQUIRE } from "../../shared/components/util/validators";

import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/UIElements/Button";

import "./EditIndie.css";

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

const EditIndie = (props) => {
  const [editIndieOKModalStatus, setEditIndieOKModalStatus] = useState(false);
  const [error, setError] = useState();
  const [formState, dispatch] = useReducer(formReducer, {
    inputs: {
      numberString: {
        value: `${props.indieInformForEdit.number}`,
        isValid: true,
      },
      name: {
        value: `${props.indieInformForEdit.name}`,
        isValid: true,
      },
      imageUrl: {
        value: `${props.indieInformForEdit.imageUrl}`,
        isValid: true,
      },
      company: {
        value: `${props.indieInformForEdit.company}`,
        isValid: true,
      },
      song: {
        value: `${props.indieInformForEdit.song}`,
        isValid: true,
      },
      birth: {
        value: `${props.indieInformForEdit.birth}`,
        isValid: true,
      },
      description: {
        value: `${props.indieInformForEdit.description}`,
        isValid: true,
      },
      soundcloud: {
        value: `${props.indieInformForEdit.soundcloud}`,
        isValid: true,
      },
      instagram: {
        value: `${props.indieInformForEdit.instagram}`,
        isValid: true,
      },
      youtube: {
        value: `${props.indieInformForEdit.youtube}`,
        isValid: true,
      },
    },
    isValid: true,
  });
  const inputHandler = useCallback((id, value, isValid) => {
    dispatch({
      type: "INPUT_CHANGE",
      value: value,
      isValid: isValid,
      inputId: id,
    });
  }, []);

  const editIndieSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:5000/admin/${props.indieName}/editIndie`,
        {
          method: "PATCH",
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
        }
      );

      if (!response.ok) {
        throw new Error("response is not ok");
      }
    } catch (err) {
      console.log(err);
      setError(err.message || "Something went wrong, please try again");
    }

    setEditIndieOKModalStatus(true);
    console.log(formState);
  };

  const editIndieOkBtnHandler = (event) => {
    event.preventDefault();
    props.onClick();
  };

  return (
    <div>
      {!editIndieOKModalStatus && (
        <div className="editIndie-modal">
          <form
            className="editIndie-modal-form"
            onSubmit={editIndieSubmitHandler}
          >
            <div className="editIndie-modal-form__input">
              <span>Number : </span>
              <Input
                element="input"
                id="numberString"
                type="text"
                validators={[VALIDATOR_REQUIRE()]}
                onInput={inputHandler}
                value={`${props.indieInformForEdit.number}`}
              />
            </div>
            <div className="editIndie-modal-form__input">
              <span>Name : </span>
              <Input
                element="input"
                id="name"
                type="text"
                validators={[VALIDATOR_REQUIRE()]}
                onInput={inputHandler}
                value={`${props.indieInformForEdit.name}`}
              />
            </div>
            <div className="editIndie-modal-form__input">
              <span>ImageUrl : </span>
              <Input
                element="input"
                id="imageUrl"
                type="text"
                validators={[VALIDATOR_REQUIRE()]}
                onInput={inputHandler}
                value={`${props.indieInformForEdit.imageUrl}`}
              />
            </div>
            <div className="editIndie-modal-form__input">
              <span>Company : </span>
              <Input
                element="input"
                id="company"
                type="text"
                validators={[VALIDATOR_REQUIRE()]}
                onInput={inputHandler}
                value={`${props.indieInformForEdit.company}`}
              />
            </div>
            <div className="editIndie-modal-form__input">
              <span>Song : </span>
              <Input
                element="input"
                id="song"
                type="text"
                validators={[VALIDATOR_REQUIRE()]}
                onInput={inputHandler}
                value={`${props.indieInformForEdit.song}`}
              />
            </div>
            <div className="editIndie-modal-form__input">
              <span>Birth : </span>
              <Input
                element="input"
                id="birth"
                type="input"
                validators={[VALIDATOR_REQUIRE()]}
                onInput={inputHandler}
                value={`${props.indieInformForEdit.birth}`}
              />
            </div>
            <div className="editIndie-modal-form__input">
              <span>Description : </span>
              <Input
                element="textarea"
                id="description"
                type="textarea"
                validators={[VALIDATOR_REQUIRE()]}
                onInput={inputHandler}
                value={`${props.indieInformForEdit.description}`}
              />
            </div>
            <div className="editIndie-modal-form__input">
              <span>Soundcloud : </span>
              <Input
                element="input"
                id="soundcloud"
                type="text"
                validators={[VALIDATOR_REQUIRE()]}
                onInput={inputHandler}
                value={`${props.indieInformForEdit.soundcloud}`}
              />
            </div>
            <div className="editIndie-modal-form__input">
              <span>Instagram : </span>
              <Input
                element="input"
                id="instagram"
                type="text"
                validators={[VALIDATOR_REQUIRE()]}
                onInput={inputHandler}
                value={`${props.indieInformForEdit.instagram}`}
              />
            </div>
            <div className="editIndie-modal-form__input">
              <span>Youtube : </span>
              <Input
                element="input"
                id="youtube"
                type="text"
                validators={[VALIDATOR_REQUIRE()]}
                onInput={inputHandler}
                value={`${props.indieInformForEdit.youtube}`}
              />
            </div>
            <Button disabled={!formState.isValid}>Edit</Button>
          </form>
        </div>
      )}
      {editIndieOKModalStatus && (
        <div className="editIndie-Ok-modal">
          <div className="editIndie-Ok-modal-form">
            <div>{formState.inputs.name.value}의 정보가 수정되었습니다.</div>
            <Button onClick={editIndieOkBtnHandler}>OK</Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditIndie;
