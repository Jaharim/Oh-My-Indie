import React, { useCallback, useState } from "react";
import ReactDOM from "react-dom";
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
} from "../../shared/components/util/validators";

import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/UIElements/Button";

import "./ContactForm.css";
const ContactForm = (props) => {
  const [error, setError] = useState();
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

  const contactSubmitHandler = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(`http://localhost:5000/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: titleFormState.value,
          content: textareaFormState.value,
          // userId 넘겨주는 것 구현하기.
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

  const content = (
    <div className="contact-modal">
      <form className="contact-form" onSubmit={contactSubmitHandler}>
        <div className="contact-header">
          <span>Contact Us</span>
        </div>
        <div className="contact-title-form">
          <span className="contact-label">제목</span>
          <Input
            id="contactTitle"
            element="input"
            type="text"
            validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(5)]}
            errorText="제목을 5글자 이상 입력해주세요."
            onInput={titleInputHandler}
          />
        </div>
        <div className="contact-textarea-form">
          <span className="contact-label">내용</span>
          <Input
            id="contactTitle"
            element="textarea"
            rows="10"
            validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(5)]}
            errorText="내용을 입력해주세요."
            onInput={textareaInputHandler}
          />
        </div>
        <Button
          className={"button"}
          disabled={!titleFormState.isValid || !textareaFormState.isValid}
        >
          보내기
        </Button>
      </form>
    </div>
  );

  return ReactDOM.createPortal(
    content,
    document.getElementById("contact-modal")
  );
};

export default ContactForm;
