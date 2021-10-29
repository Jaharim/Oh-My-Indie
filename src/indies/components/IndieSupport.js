import React, { Fragment } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import Message from "./Message";

import "./IndieSupport.css";
import Button from "../../shared/components/UIElements/Button";

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
