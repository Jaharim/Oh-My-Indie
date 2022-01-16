import React, { useCallback, useContext, useState } from "react";
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
} from "../../shared/components/util/validators";

import { AuthContext } from "../../shared/components/context/auth-context";

import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/UIElements/Button";

import "./AddReply.css";
import ErrorModal from "../../shared/components/error/ErrorModal";

const AddReply = (props) => {
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState();
  const auth = useContext(AuthContext);
  const [okModalStatus, setOkModalStatus] = useState(false);
  const [replyFormState, setReplyFormState] = useState({
    value: "",
    isValid: false,
  });

  const errorModalCloseHandler = () => {
    setError(false);
  };

  const textareaInputHandler = useCallback((id, value, isValid) => {
    setReplyFormState({
      value: value,
      isValid: isValid,
      inputId: id,
    });
  }, []);

  const replyOkBtnHandler = () => {
    props.onSubmit();
  };

  const addReplyCancelBtnHandler = () => {
    props.onCancel();
  };

  const replySubmitHandler = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/admin/contact/reply`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth.token}`,
          },
          body: JSON.stringify({
            content: replyFormState.value,
            id: props.props.id,
          }),
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
    setOkModalStatus(true);
  };

  return (
    <React.Fragment>
      {error && (
        <ErrorModal errorMsg={errorMsg} onClose={errorModalCloseHandler} />
      )}
      {!okModalStatus && (
        <div className="contact-modal">
          <form className="contact-form" onSubmit={replySubmitHandler}>
            <div className="contact-header">
              <span>Add Reply</span>
            </div>
            <div className="contact-textarea-form">
              <Input
                id="contactTitle"
                element="textarea"
                rows="10"
                cols="30"
                validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(5)]}
                errorText="내용을 입력해주세요."
                onInput={textareaInputHandler}
              />
            </div>
            <div className="addreply-confirm-btn__container">
              <Button className={"button"} disabled={!replyFormState.isValid}>
                등록
              </Button>
              <Button onClick={addReplyCancelBtnHandler}>닫기</Button>
            </div>
          </form>
        </div>
      )}
      {okModalStatus && (
        <div className="add-reply-Ok-modal">
          <div className="add-reply-Ok-modal-form">
            <div>등록이 완료되었습니다.</div>
            <Button onClick={replyOkBtnHandler}>확인</Button>
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export default AddReply;
