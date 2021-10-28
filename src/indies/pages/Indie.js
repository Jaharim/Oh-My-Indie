import React, { Fragment } from "react";
import { useParams } from "react-router-dom";
import IndieDetail from "../components/IndieDetail";

import "./Indie.css";

const Indie = () => {
  const params = useParams();
  return (
    <div className="indie">
      <div className="indie__container">
        <h1 className="indie__header">My Indie, {params.indieId}</h1>
        <IndieDetail name={params.indieId} />
      </div>
    </div>
  );
};

export default Indie;
