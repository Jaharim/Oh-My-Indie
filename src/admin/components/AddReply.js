import React, { useCallback, useContext, useState } from "react";
import ReactDOM from "react-dom";
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
} from "../../shared/components/util/validators";

import { AuthContext } from "../../shared/components/context/auth-context";

import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/UIElements/Button";

import "./AddReply.css";

const AddReply = (props) => {
  const [error, setError] = useState();
  const auth = useContext(AuthContext);
  const [okModalStatus, setOkModalStatus] = useState(false);
  const [replyFormState, setReplyFormState] = useState({
    value: "",
    isValid: false,
  });

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
        `http://localhost:5000/admin/contact/reply`,
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

      if (!response.ok) {
        throw new Error("response is not ok");
      }
    } catch (err) {
      console.log(err);
      setError(err.message || "Something went wrong, please try again");
    }
    setOkModalStatus(true);
  };

  return (
    <div>
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
            <Button onClick={replyOkBtnHandler}>OK</Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddReply;
