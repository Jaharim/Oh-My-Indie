import React, { useCallback, useContext, useEffect, useState } from "react";
import { AuthContext } from "../../shared/components/context/auth-context";
import ErrorModal from "../../shared/components/error/ErrorModal";
import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/UIElements/Button";
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../shared/components/util/validators";

import "./Reply.css";

const Reply = (props) => {
  const auth = useContext(AuthContext);
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState();
  const [contentStatus, setContentStatus] = useState(false);
  const [editOkModalStatus, setEditOkModalStatus] = useState(false);

  const [content, setContent] = useState();
  const [editReplyFormState, setEditReplyFormState] = useState({
    value: `${content}`,
    isValid: false,
  });

  const textareaInputHandler = useCallback((id, value, isValid) => {
    setEditReplyFormState({
      value: value,
      isValid: isValid,
      inputId: id,
    });
  }, []);

  const closeReplyModal = () => {
    props.onClose();
  };

  let adminCheckForEdit = false;
  if (auth.isAdmin) {
    adminCheckForEdit = true;
  }

  const editReplyHandler = () => {
    setContentStatus(true);
  };

  const closeEditReply = () => {
    setContentStatus(false);
  };

  const errorModalCloseHandler = () => {
    setError(false);
  };

  const editReplySubmitHandler = async () => {
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
            content: editReplyFormState.value,
            id: props.props.id,
          }),
        }
      );

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.message);
      }
      setEditOkModalStatus(true);
    } catch (err) {
      setErrorMsg(err.message);
      setError(true);
    }
  };

  useEffect(() => {
    const getReplyContent = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/admin/contact/complete/${props.props.id}`,
          {
            headers: {
              Authorization: `Bearer ${auth.token}`,
            },
          }
        );

        const responseData = await response.json();

        if (!response.ok) {
          throw new Error(responseData.message);
        }

        setContent(responseData.content);
      } catch (err) {
        setErrorMsg(err.message);
        setError(true);
      }
    };
    getReplyContent();
  }, [auth.token, props.props.id]);

  return (
    <React.Fragment>
      {error && (
        <ErrorModal errorMsg={errorMsg} onClose={errorModalCloseHandler} />
      )}
      {!contentStatus && !editOkModalStatus && (
        <div className="reply-modal">
          <div className="reply-form">
            <div className="reply-form-content">
              <div className="reply-content-header">
                ???????????????, {props.props.nickname} ???!
              </div>
              <div>{content}</div>
              <div className="reply-content-tail">
                ?????? ?????? Oh, My Indie!??? ?????????????????? ???????????????. <br />??? ??????
                ???????????? ????????? ??? ????????? ?????????????????????.
              </div>
            </div>
            <div className="reply-button-form">
              {adminCheckForEdit && (
                <Button onClick={editReplyHandler}>??????</Button>
              )}
              <Button onClick={closeReplyModal}>??????</Button>
            </div>
          </div>
        </div>
      )}
      {contentStatus && !editOkModalStatus && (
        <div className="reply-modal">
          <div className="reply-form">
            <div className="edit-reply-form-content">
              <div className="edit-reply-content-header">?????? ??????</div>
              <Input
                id="replyContent"
                element="textarea"
                rows="13"
                cols="30"
                validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(5)]}
                errorText="????????? ??????????????????."
                onInput={textareaInputHandler}
                value={content}
              />
            </div>
            <div className="reply-button-form">
              <Button
                onClick={editReplySubmitHandler}
                className={"button"}
                disabled={!editReplyFormState.isValid}
              >
                ??????
              </Button>
              <Button onClick={closeEditReply}>??????</Button>
            </div>
          </div>
        </div>
      )}
      {editOkModalStatus && (
        <div className="edit-reply-Ok-modal">
          <div className="edit-reply-Ok-modal-form">
            <div>????????? ?????????????????????.</div>
            <Button onClick={closeReplyModal}>??????</Button>
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export default Reply;
