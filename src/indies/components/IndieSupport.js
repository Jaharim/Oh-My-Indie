import React, { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import Message from "./Message";

import "./IndieSupport.css";
import Button from "../../shared/components/UIElements/Button";

const IndieSupport = (props) => {
  const [error, setError] = useState();
  const [supportArr, setSupportArr] = useState([]);
  const supportMessage = [];
  const params = useParams();

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
  }, []);
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
        <Button className="support-back button">
          <Link to={`/indie/${params.indieId}`} className="support-back__btn">
            Back
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default IndieSupport;
