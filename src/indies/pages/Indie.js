import React, { Fragment, useContext, useEffect, useState } from "react";
import { Redirect, useParams, useHistory } from "react-router-dom";
import { AuthContext } from "../../shared/components/context/auth-context";
import ErrorModal from "../../shared/components/error/ErrorModal";
import Button from "../../shared/components/UIElements/Button";
import IndieDetail from "../components/IndieDetail";

import "./Indie.css";

const Indie = (props) => {
  const auth = useContext(AuthContext);
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState();
  const history = useHistory();
  const params = useParams();

  const errorModalOpenHandler = (msg) => {
    setErrorMsg(msg);
    setError(true);
    console.log("props 작동!");
  };
  const errorModalCloseHandler = () => {
    setError(false);
  };

  useEffect(() => {
    const indieExistChecker = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/indie/${params.indieId}`,
          {
            headers: {
              Authorization: `Bearer ${auth.token}`,
            },
          }
        );

        const responseData = await response.json();

        if (!response.ok) {
          props.onErrorSubmit();
          throw new Error(responseData.message);
        }
      } catch (err) {
        //console.log(err);
        setErrorMsg(err.message);
        setError(true);
      }
    };
    indieExistChecker();
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
          <IndieDetail
            className="indie__body"
            name={params.indieId}
            onError={errorModalOpenHandler}
          />
          <Button className="back-Btn__indie" onClick={goToBackPageHandler}>
            뒤로가기
          </Button>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Indie;
