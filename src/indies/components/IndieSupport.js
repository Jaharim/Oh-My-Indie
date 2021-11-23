import React, { Fragment, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { Link } from "react-router-dom";
import Message from "./Message";

import "./IndieSupport.css";
import Button from "../../shared/components/UIElements/Button";
import AddSupportMsgModal from "./AddSupportMsg";
import Backdrop from "../../shared/components/UIElements/Backdrop";

const IndieSupport = (props) => {
  const [error, setError] = useState();
  const [addSupportMsgModalStatus, setAddSupportMsgModalStatus] =
    useState(false);
  const history = useHistory();
  const [supportArr, setSupportArr] = useState([]);
  const supportMessage = [];
  const params = useParams();

  const openAddSupportMsgModalHandler = () => {
    setAddSupportMsgModalStatus(true);
  };

  const closeAddSupportMsgModalHandler = () => {
    setAddSupportMsgModalStatus(false);
  };

  const goToBackPageHandler = () => {
    history.replace(`/indie/${params.indieId}`);
  };

  useEffect(() => {
    const getSupportMessage = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/indie/${params.indieId}/support`
        );

        const responseData = await response.json();

        if (!response.ok) {
          throw new Error(responseData.message);
        }
        await responseData.supportMessageJson.map((el) => {
          supportMessage.push(el);
        });

        await setSupportArr(supportMessage);
      } catch (err) {
        console.log(err);
        setError(err.message || "Something went wrong, please try again");
      }
    };
    getSupportMessage();
  }, [addSupportMsgModalStatus]);
  //<Link to={`/indie/${params.indieId}`} className="support-back__btn"></Link>

  return (
    <div className="support">
      <div className="support-container">
        <h1 className="support-header"> {params.indieId} 에게, </h1>
        <div className="support-main">
          <ul className="support-body">
            {supportArr.map((el) => {
              return (
                <li className="support-message">
                  <Message
                    title={el.title}
                    body={el.body}
                    creator={el.creator}
                  />
                </li>
              );
            })}
          </ul>
        </div>
        <div className="support-button__container">
          <Button
            className="add-support-message"
            onClick={openAddSupportMsgModalHandler}
          >
            Add
          </Button>
          <Button className="support-back" onClick={goToBackPageHandler}>
            Back
          </Button>
        </div>
      </div>
      {addSupportMsgModalStatus && (
        <Backdrop onClick={closeAddSupportMsgModalHandler} />
      )}
      {addSupportMsgModalStatus && (
        <AddSupportMsgModal onSubmit={closeAddSupportMsgModalHandler} />
      )}
    </div>
  );
};

export default IndieSupport;
