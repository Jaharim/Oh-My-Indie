import React, { Fragment } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import Message from "./Message";

import "./IndieSupport.css";

const DUMMY_SUPPORT = [
  { title: "가나다라", body: "마바사 아자차카타파하!!!!!", creator: "유재석" },
  { title: "가나다라", body: "마바사 아자차카타파하!!!!!", creator: "유재석" },
  ,
  { title: "가나다라", body: "마바사 아자차카타파하!!!!!", creator: "유재석" },
  { title: "가나다라", body: "마바사 아자차카타파하!!!!!", creator: "유재석" },
  { title: "가나다라", body: "마바사 아자차카타파하!!!!!", creator: "유재석" },
  { title: "가나다라", body: "마바사 아자차카타파하!!!!!", creator: "유재석" },

  { title: "가나다라", body: "마바사 아자차카타파하!!!!!", creator: "유재석" },
  { title: "가나다라", body: "마바사 아자차카타파하!!!!!", creator: "유재석" },
  { title: "가나다라", body: "마바사 아자차카타파하!!!!!", creator: "유재석" },

  { title: "가나다라", body: "마바사 아자차카타파하!!!!!", creator: "유재석" },
  { title: "가나다라", body: "마바사 아자차카타파하!!!!!", creator: "유재석" },
  { title: "가나다라", body: "마바사 아자차카타파하!!!!!", creator: "유재석" },

  { title: "가나다라", body: "마바사 아자차카타파하!!!!!", creator: "유재석" },
  { title: "가나다라", body: "마바사 아자차카타파하!!!!!", creator: "유재석" },

  { title: "가나다라", body: "마바사 아자차카타파하!!!!!", creator: "유재석" },
  { title: "가나다라", body: "마바사 아자차카타파하!!!!!", creator: "유재석" },
];

const IndieSupport = (props) => {
  const params = useParams();
  return (
    <div className="support">
      <div className="support-container">
        <h1 className="support-header"> {params.indieId} 에게, </h1>
        <div className="support-main">
          <ul className="support-body">
            {DUMMY_SUPPORT.map((el) => {
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
        <div className="support-back">
          <Link to={`/indie/${params.indieId}`}>Back</Link>
        </div>
      </div>
    </div>
  );
};

export default IndieSupport;
