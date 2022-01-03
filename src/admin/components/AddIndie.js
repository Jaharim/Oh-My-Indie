import React, { useCallback, useContext, useReducer, useState } from "react";
import { VALIDATOR_REQUIRE } from "../../shared/components/util/validators";

import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/UIElements/Button";
import ImageUpload from "./ImageUpload";
import { AuthContext } from "../../shared/components/context/auth-context";

import "./AddIndie.css";
import ErrorModal from "../../shared/components/error/ErrorModal";

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
  const auth = useContext(AuthContext);
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState();
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
      image: {
        value: null,
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

  const errorModalCloseHandler = () => {
    setError(false);
  };

  const addIndieSubmitHandler = async (event) => {
    event.preventDefault();

    console.log(formState.inputs);
    try {
      const formData = new FormData();
      formData.append("numberString", formState.inputs.numberString.value);
      formData.append("name", formState.inputs.name.value);
      formData.append("company", formState.inputs.company.value);
      formData.append("song", formState.inputs.song.value);
      formData.append("birth", formState.inputs.birth.value);
      formData.append("description", formState.inputs.description.value);
      formData.append("soundcloud", formState.inputs.soundcloud.value);
      formData.append("instagram", formState.inputs.instagram.value);
      formData.append("youtube", formState.inputs.youtube.value);
      formData.append("image", formState.inputs.image.value);

      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/admin/addIndie`,
        {
          method: "POST",
          body: formData,
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        }
      );

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.message);
      }
    } catch (err) {
      setErrorMsg(err.message);
      setError(true);
    }

    setAddIndieOkModalStatus(true);
  };

  const addIndieOkBtnHandler = (event) => {
    event.preventDefault();
    props.onSubmit();
  };

  return (
    <div>
      {error && (
        <ErrorModal errorMsg={errorMsg} onClose={errorModalCloseHandler} />
      )}
      {!addIndieOkModalStatus && (
        <div className="addIndie-modal">
          <form
            className="addIndie-modal-form"
            onSubmit={addIndieSubmitHandler}
          >
            <div className="addIndie-modal-form__input">
              <span>등록번호 : </span>
              <Input
                element="input"
                id="numberString"
                type="text"
                validators={[VALIDATOR_REQUIRE()]}
                onInput={inputHandler}
              />
            </div>
            <div className="addIndie-modal-form__input">
              <span>이름 : </span>
              <Input
                element="input"
                id="name"
                type="text"
                validators={[VALIDATOR_REQUIRE()]}
                onInput={inputHandler}
              />
            </div>
            <ImageUpload
              className="addIndie-modal-form__input"
              id="image"
              onInput={inputHandler}
            />
            <div className="addIndie-modal-form__input">
              <span>소속사 : </span>
              <Input
                element="input"
                id="company"
                type="text"
                validators={[VALIDATOR_REQUIRE()]}
                onInput={inputHandler}
              />
            </div>
            <div className="addIndie-modal-form__input">
              <span>대표곡 : </span>
              <Input
                element="input"
                id="song"
                type="text"
                validators={[VALIDATOR_REQUIRE()]}
                onInput={inputHandler}
              />
            </div>
            <div className="addIndie-modal-form__input">
              <span>생년월일 : </span>
              <Input
                element="input"
                id="birth"
                type="input"
                validators={[VALIDATOR_REQUIRE()]}
                onInput={inputHandler}
              />
            </div>
            <div className="addIndie-modal-form__input">
              <span>설명 : </span>
              <Input
                element="textarea"
                id="description"
                type="textarea"
                cols="22"
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
            <Button disabled={!formState.isValid}>추가</Button>
          </form>
        </div>
      )}
      {addIndieOkModalStatus && (
        <div className="addIndie-Ok-modal">
          <div className="addIndie-Ok-modal-form">
            <div>{formState.inputs.name.value}의 등록이 완료되었습니다.</div>
            <Button onClick={addIndieOkBtnHandler}>확인</Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddIndie;
