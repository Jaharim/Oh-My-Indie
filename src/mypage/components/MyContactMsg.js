import React, { useContext, useEffect, useState } from "react";
import Button from "../../shared/components/UIElements/Button";

import ContactMessage from "../../admin/components/ContactMessage";
import { useHistory } from "react-router";
import { AuthContext } from "../../shared/components/context/auth-context";
import "./MyContactMsg.css";

const MyContactMsg = (props) => {
  const auth = useContext(AuthContext);
  const history = useHistory();
  const contactMessage = [];
  const [error, setError] = useState();
  const [contactArr, setContactArr] = useState([]);
  const backToMyPageHandler = (event) => {
    event.preventDefault();
    history.replace("/mypage");
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
        await responseData.myContactMessageJson.map((el) => {
          contactMessage.push(el);
        });

        await setContactArr(contactMessage);
      } catch (err) {
        console.log(err);
        setError(err.message || "Something went wrong, please try again");
      }
    };
    getContactMessage();
  }, []);

  return (
    <div className="contact-mypage">
      <div className="contact-mypage-container">
        <h1 className="contact-mypage-header"> Contact Messages </h1>
        <div className="contact-mypage-main">
          <ul className="contact-mypage-body">
            {contactArr.map((el) => {
              return (
                <li className="contact-mypage-message">
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
          <Button className="contact-mypage-back" onClick={backToMyPageHandler}>
            Back
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MyContactMsg;
