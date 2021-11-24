import React, {
  useCallback,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import { useParams } from "react-router";
import { AuthContext } from "../../shared/components/context/auth-context";
import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/UIElements/Button";
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../shared/components/util/validators";

import "./AddSupportMsg.css";

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

const EditSupportMsg = (props) => {
  const auth = useContext(AuthContext);
  const [okModalStatus, setOkModalStatus] = useState(false);
  const [error, setError] = useState();
  const params = useParams();
  const [formState, dispatch] = useReducer(formReducer, {
    inputs: {
      supportMsgTitle: {
        value: "",
        isValid: false,
      },
      supportMsgContent: {
        value: "",
        isValid: false,
      },
    },
    isValid: false,
  });

  useEffect(() => {
    const getSupportMsgData = async () => {
      /* try {
              const response = await fetch(
                `http://localhost:5000/indie/${enteredIndieName.current.value}`
              );

              const responseData = await response.json();
              const responseImg = `http://localhost:5000/${responseData.image}`;
              responseData.image = responseImg;
              setSearchedData(responseData);
              if (!response.ok) {
                throw new Error("response is not ok");
              }

              setEditBackdropStatus(true);
            } catch (err) {
              console.log(err);
              setError(err.message || "Something went wrong, please try again");
            } */
    };
    getSupportMsgData();
  }, []);

  const inputHandler = useCallback((id, value, isValid) => {
    dispatch({
      type: "INPUT_CHANGE",
      value: value,
      isValid: isValid,
      inputId: id,
    });
  }, []);

  const editSubmitHandler = async (event) => {
    event.preventDefault();

    try {
    } catch (err) {}

    setOkModalStatus(true);
  };
  const editOkBtnHandler = () => {
    props.onSubmit();
  };

  return (
    <div>
      {!okModalStatus && (
        <div className="support-message-modal">
          <form className="support-message-form" onSubmit={editSubmitHandler}>
            <div className="support-message-header">
              <span>Support Message</span>
            </div>
            <div className="support-message-title-form">
              <span className="support-message-label">제목</span>
              <Input
                id="supportMsgTitle"
                element="input"
                type="text"
                validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(5)]}
                errorText="제목을 5글자 이상 입력해주세요."
                onInput={inputHandler}
              />
            </div>
            <div className="support-message-textarea-form">
              <span className="support-message-label">내용</span>
              <Input
                id="supportMsgContent"
                element="textarea"
                rows="10"
                validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(5)]}
                errorText="내용을 입력해주세요."
                onInput={inputHandler}
              />
            </div>
            <Button disabled={!formState.isValid}>등록</Button>
          </form>
        </div>
      )}
      {okModalStatus && (
        <div className="support-message-post-Ok-modal">
          <div className="support-message-post-Ok-modal-form">
            <div>수정이 완료되었습니다.</div>
            <Button onClick={editOkBtnHandler}>OK</Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditSupportMsg;
