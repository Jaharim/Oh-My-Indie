import React, { Fragment, useEffect, useState } from "react";
import { Redirect, useParams } from "react-router-dom";
import IndieDetail from "../components/IndieDetail";

import "./Indie.css";

const Indie = (props) => {
  useEffect(() => {
    const indieExistChecker = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/indie/${params.indieId}`
        );

        const responseData = await response.json();

        if (!response.ok) {
          props.onErrorSubmit();
          throw new Error(responseData.message);
        }
      } catch (err) {
        console.log(err);
      }
    };
    indieExistChecker();
  }, []);

  const params = useParams();
  return (
    <div className="indie">
      <div className="indie__container">
        <h1 className="indie__header">My Indie, {params.indieId}</h1>
        <IndieDetail className="indie__body" name={params.indieId} />
      </div>
    </div>
  );
};

export default Indie;
