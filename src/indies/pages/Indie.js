import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import ErrorModal from "../../shared/components/error/ErrorModal";
import Button from "../../shared/components/UIElements/Button";
import IndieDetail from "../components/IndieDetail";

import "./Indie.css";

const Indie = (props) => {
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState();
  const history = useHistory();
  const params = useParams();

  const errorModalCloseHandler = () => {
    setError(false);
  };

  const storedData = JSON.parse(localStorage.getItem("userData"));
  useEffect(() => {
    const indieExistChecker = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/indie/${params.indieId}`,
          {
            headers: {
              Authorization: `Bearer ${storedData.token}`,
            },
          }
        );

        const responseData = await response.json();
        if (!response.ok) {
          throw new Error(responseData.message);
        }
      } catch (err) {
        console.log(err);
        setErrorMsg(err.message);
        setError(true);
      }
    };

    indieExistChecker();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const goToBackPageHandler = () => {
    history.replace(`/indie`);
  };

  return (
    <React.Fragment>
      {error && (
        <ErrorModal errorMsg={errorMsg} onClose={errorModalCloseHandler} />
      )}
      <div className="indie">
        <div className="indie__container">
          <h1 className="indie__header">My Indie, {params.indieId}</h1>
          <IndieDetail className="indie__body" name={params.indieId} />
          <Button className="back-Btn__indie" onClick={goToBackPageHandler}>
            뒤로가기
          </Button>
        </div>
      </div>
    </React.Fragment>
  );
};

export default React.memo(Indie);
