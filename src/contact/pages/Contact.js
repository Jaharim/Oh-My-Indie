import React from "react";

import "./Contact.css";

const Contact = (props) => {
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
      </div>
    </div>
  );
};

export default Contact;
