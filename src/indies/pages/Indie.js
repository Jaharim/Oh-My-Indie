import React, { Fragment } from "react";
import { useParams } from "react-router-dom";
import IndieDetail from "../components/IndieDetail";

const Indie = () => {
  const params = useParams();
  return (
    <Fragment>
      <h1>My Indie, {params.indieId}</h1>
      <IndieDetail name={params.indieId} />
    </Fragment>
  );
};

export default Indie;
