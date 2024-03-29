import React, { useCallback, useContext, useState } from "react";
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
  VALIDATOR_MAXLENGTH,
} from "../../shared/components/util/validators";

import { AuthContext } from "../../shared/components/context/auth-context";

import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/UIElements/Button";

import "./ContactForm.css";
import ErrorModal from "../../shared/components/error/ErrorModal";
import Loading from "../../shared/components/UIElements/Loading";
const ContactForm = (props) => {
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState();
  const auth = useContext(AuthContext);
  const [loadingSpinner, setLoadingSpinner] = useState(false);
  const [okModalStatus, setOkModalStatus] = useState(false);
  const [titleFormState, setFormState] = useState({
    value: "",
    isValid: false,
  });
  const [textareaFormState, setTextareaFormState] = useState({
    value: "",
    isValid: false,
  });

  const titleInputHandler = useCallback((id, value, isValid) => {
    setFormState({
      value: value,
      isValid: isValid,
      inputId: id,
    });
  }, []);

  const textareaInputHandler = useCallback((id, value, isValid) => {
    setTextareaFormState({
      value: value,
      isValid: isValid,
      inputId: id,
    });
  }, []);

  const errorModalCloseHandler = () => {
    setError(false);
  };

  const contactOkBtnHandler = () => {
    props.onSubmit();
  };

  const contactSubmitHandler = async (event) => {
    event.preventDefault();
    setLoadingSpinner(true);
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/contact`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth.token}`,
          },
          body: JSON.stringify({
            title: titleFormState.value,
            content: textareaFormState.value,
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
    setLoadingSpinner(false);
    setOkModalStatus(true);
  };

  return (
    <React.Fragment>
      {error && (
        <ErrorModal errorMsg={errorMsg} onClose={errorModalCloseHandler} />
      )}
      {!okModalStatus && (
        <div className="contact-modal">
          <form className="contact-form" onSubmit={contactSubmitHandler}>
            {loadingSpinner && <Loading />}
            <div className="contact-header">
              <span>Contact Us</span>
            </div>
            <div className="contact-title-form">
              <span className="contact-label">제목</span>
              <Input
                id="contactTitle"
                element="input"
                type="text"
                validators={[
                  VALIDATOR_REQUIRE(),
                  VALIDATOR_MINLENGTH(5),
                  VALIDATOR_MAXLENGTH(25),
                ]}
                placeholder="5글자 이상 (최대 25자)"
                onInput={titleInputHandler}
              />
            </div>
            <div className="contact-textarea-form">
              <span className="contact-label">내용</span>
              <Input
                id="contactTitle"
                element="textarea"
                rows="10"
                cols="22"
                validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(5)]}
                placeholder="5글자 이상 입력해주세요."
                onInput={textareaInputHandler}
              />
            </div>
            <div className="contact-button-form">
              <Button
                className={"button"}
                disabled={!titleFormState.isValid || !textareaFormState.isValid}
              >
                보내기
              </Button>
              <Button type="button" onClick={contactOkBtnHandler}>
                닫기
              </Button>
            </div>
          </form>
        </div>
      )}
      {okModalStatus && (
        <div className="contact-post-Ok-modal">
          <div className="contact-post-Ok-modal-form">
            <div>등록이 완료되었습니다.</div>
            <Button onClick={contactOkBtnHandler}>OK</Button>
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export default ContactForm;
