import React, { useContext, useState } from "react";
import { useHistory } from "react-router";
import Backdrop from "../../shared/components/UIElements/Backdrop";
import Button from "../../shared/components/UIElements/Button";
import AskAuth from "../components/AskAuth";
import ContactForm from "../components/ContactForm";

import { AuthContext } from "../../shared/components/context/auth-context";

import "./Contact.css";

const Contact = (props) => {
  const history = useHistory();
  const auth = useContext(AuthContext);
  const [contactFormOpen, setContactFormOpen] = useState(false);

  const contactModalOpenHandler = (event) => {
    setContactFormOpen(true);
  };

  const contactModalCloseHandler = (event) => {
    setContactFormOpen(false);
    if (!auth.isLoggedIn) history.replace("/auth");
  };

  return (
    <div className="contact">
      <div className="contact__container">
        <h1 className="contact__header"> Contact Us!</h1>
        <div className="contact__content">
          <div className="contact__indieOwn">
            <h2> Indie Musician </h2>
            <p>
              당신을 알려주세요 !
              <br />더 많은 사람들에게 소개할게요.
            </p>
          </div>
          <span />
          <div>
            <h2> Introduce your Indie </h2>
            <p>
              당신의 Indie를 알려주세요 !
              <br />더 많은 사람들에게 소개할게요.
            </p>
          </div>
          <span />
          <div>
            <h2> For Us </h2>
            <p>
              Oh, My Indie에 대한
              <br />
              당신의 의견을 말해주세요.
            </p>
          </div>
        </div>

        <Button className="button" onClick={contactModalOpenHandler}>
          contact
        </Button>
        {!auth.isLoggedIn && contactFormOpen && (
          <Backdrop onClick={contactModalCloseHandler} />
        )}
        {!auth.isLoggedIn && contactFormOpen && <AskAuth />}
        {auth.isLoggedIn && contactFormOpen && (
          <Backdrop onClick={contactModalCloseHandler} />
        )}
        {auth.isLoggedIn && contactFormOpen && (
          <ContactForm onSubmit={contactModalCloseHandler} />
        )}
      </div>
    </div>
  );
};

export default Contact;
