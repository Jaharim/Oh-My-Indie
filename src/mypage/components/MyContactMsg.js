import React, { useContext, useEffect, useState } from "react";
import Button from "../../shared/components/UIElements/Button";
import { v4 as uuidv4 } from "uuid";

import ContactMessage from "../../admin/components/ContactMessage";
import { useHistory } from "react-router";
import { AuthContext } from "../../shared/components/context/auth-context";
import "./MyContactMsg.css";
import ErrorModal from "../../shared/components/error/ErrorModal";

const MyContactMsg = (props) => {
  const auth = useContext(AuthContext);
  const history = useHistory();
  const contactMessage = [];
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState();
  const [contactArr, setContactArr] = useState([]);

  const backToMyPageHandler = (event) => {
    event.preventDefault();
    history.replace("/mypage");
  };

  const errorModalCloseHandler = () => {
    setError(false);
  };

  useEffect(() => {
    const getContactMessage = async () => {
      try {
        const response = await fetch(`http://localhost:5000/mypage/contact`, {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        });

        const responseData = await response.json();

        if (!response.ok) {
          throw new Error(responseData.message);
        }
        await responseData.myContactMessageJson.forEach((el) => {
          contactMessage.push(el);
        });

        await setContactArr(contactMessage);
      } catch (err) {
        setErrorMsg(err.message);
        setError(true);
      }
    };
    getContactMessage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <React.Fragment>
      {error && (
        <ErrorModal errorMsg={errorMsg} onClose={errorModalCloseHandler} />
      )}
      <div className="contact-mypage">
        <div className="contact-mypage-container">
          <h1 className="contact-mypage-header"> Contact Messages </h1>
          <div className="contact-mypage-main">
            <ul className="contact-mypage-body">
              {contactArr.map((el) => {
                return (
                  <li className="contact-mypage-message" key={uuidv4()}>
                    <ContactMessage
                      title={el.title}
                      content={el.content}
                      nickname={el.nickname}
                      id={el.id}
                      replyStatus={el.replyStatus}
                    />
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="contact-mypage-button__container">
            <Button
              className="back-Btn__mypage-contact"
              onClick={backToMyPageHandler}
            >
              뒤로가기
            </Button>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default MyContactMsg;
