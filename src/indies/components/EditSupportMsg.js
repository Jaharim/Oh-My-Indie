import React, { useCallback, useContext, useReducer, useState } from "react";
import { useParams } from "react-router";
import { AuthContext } from "../../shared/components/context/auth-context";
import ErrorModal from "../../shared/components/error/ErrorModal";
import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/UIElements/Button";
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
  VALIDATOR_MAXLENGTH,
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
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState();
  const params = useParams();
  const [formState, dispatch] = useReducer(formReducer, {
    inputs: {
      supportMsgTitle: {
        value: `${props.props.title}`,
        isValid: true,
      },
      supportMsgContent: {
        value: `${props.props.body}`,
        isValid: true,
      },
    },
    isValid: true,
  });

  //changeCheckHandler context로 해주기. redux로 해줘도 좋을듯.

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

  const editSubmitHandler = async (event) => {
    event.preventDefault();

    try {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/indie/${params.indieId}/support`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${auth.token}`,
            },
            body: JSON.stringify({
              title: formState.inputs.supportMsgTitle.value,
              body: formState.inputs.supportMsgContent.value,
              id: props.props.id,
            }),
          }
        );

        const responseData = await response.json();

        if (!response.ok) {
          throw new Error(responseData.message);
        }

        setOkModalStatus(true);
      } catch (err) {
        setErrorMsg(err.message);
        setError(true);
      }
    } catch (err) {}
  };
  const editOkBtnHandler = () => {
    props.onSubmit();
  };

  return (
    <div>
      {error && (
        <ErrorModal errorMsg={errorMsg} onClose={errorModalCloseHandler} />
      )}
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
                validators={[
                  VALIDATOR_REQUIRE(),
                  VALIDATOR_MINLENGTH(5),
                  VALIDATOR_MAXLENGTH(15),
                ]}
                value={`${props.props.title}`}
                onInput={inputHandler}
                placeholder="5글자 이상 (최대 15자)"
              />
            </div>
            <div className="support-message-textarea-form">
              <span className="support-message-label">내용</span>
              <Input
                id="supportMsgContent"
                element="textarea"
                rows="10"
                validators={[
                  VALIDATOR_REQUIRE(),
                  VALIDATOR_MINLENGTH(5),
                  VALIDATOR_MAXLENGTH(150),
                ]}
                value={`${props.props.body}`}
                onInput={inputHandler}
                placeholder="5글자 이상 입력해주세요.(최대 150자)"
              />
            </div>
            <div className="support-message-button-form">
              <Button disabled={!formState.isValid}>수정</Button>
              <Button
                type="button"
                onClick={() => {
                  props.onCancel();
                }}
              >
                닫기
              </Button>
            </div>
          </form>
        </div>
      )}
      {okModalStatus && (
        <div className="support-message-post-Ok-modal">
          <div className="support-message-post-Ok-modal-form">
            <div>수정이 완료되었습니다.</div>
            <Button onClick={editOkBtnHandler}>확인</Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditSupportMsg;
