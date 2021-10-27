import React, { Fragment } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";

const IndieSupport = (props) => {
  const params = useParams();
  return (
    <Fragment>
      <h1> {params.indieId} 에게, </h1>
      <div>
        <h1>Support Messages</h1>
      </div>
      <Link to={`/indie/${params.indieId}`}>Back</Link>
    </Fragment>
  );
};

export default IndieSupport;
