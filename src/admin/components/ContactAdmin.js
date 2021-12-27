import React, { Fragment, useContext, useEffect, useState } from "react";

import Button from "../../shared/components/UIElements/Button";
import "./ContactAdmin.css";
import { AuthContext } from "../../shared/components/context/auth-context";
import ContactMessage from "./ContactMessage";
import { useHistory } from "react-router";
import ErrorModal from "../../shared/components/error/ErrorModal";

const ContactAdmin = (props) => {
  const auth = useContext(AuthContext);
  const history = useHistory();
  const contactMessage = [];
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState();
  const [contactArr, setContactArr] = useState([]);
  const [addReplyStatus, setAddReplyStatus] = useState(false);
  const [deleteContactStatus, setDeleteContactStatus] = useState(false);

  const backToAdminPageHandler = (event) => {
    event.preventDefault();
    history.replace("/admin");
  };

  const addReplyHandler = (props) => {
    setAddReplyStatus(true);
  };

  const deleteContactMsgHandler = (props) => {
    setDeleteContactStatus(true);
  };

  const errorModalCloseHandler = () => {
    setError(false);
  };

  useEffect(() => {
    const getContactMessage = async () => {
      try {
        const response = await fetch(`http://localhost:5000/admin/contact`, {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        });

        const responseData = await response.json();

        if (!response.ok) {
          throw new Error(responseData.message);
        }
        await responseData.contactMessageJson.map((el) => {
          contactMessage.push(el);
        });

        await setContactArr(contactMessage);
      } catch (err) {
        setErrorMsg(err.message);
        setError(true);
      }
    };
    getContactMessage();
    setDeleteContactStatus(false);
    setAddReplyStatus(false);
  }, [deleteContactStatus, addReplyStatus]);

  return (
    <React.Fragment>
      {error && (
        <ErrorModal errorMsg={errorMsg} onClose={errorModalCloseHandler} />
      )}
      <div className="contact-admin">
        <div className="contact-admin-container">
          <h1 className="contact-admin-header"> Contact Messages </h1>
          <div className="contact-admin-main">
            <ul className="contact-admin-body">
              {contactArr.map((el) => {
                return (
                  <li className="contact-admin-message">
                    <ContactMessage
                      title={el.title}
                      content={el.content}
                      nickname={el.nickname}
                      id={el.id}
                      addReply={true}
                      onDelete={deleteContactMsgHandler}
                      onReplied={addReplyHandler}
                    />
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="contact-admin-button__container">
            <Button
              className="back-Btn__contact-admin"
              onClick={backToAdminPageHandler}
            >
              뒤로가기
            </Button>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default ContactAdmin;
