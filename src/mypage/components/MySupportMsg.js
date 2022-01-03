import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router";
import SupportMessage from "../../indies/components/SupportMessage";
import { AuthContext } from "../../shared/components/context/auth-context";
import { v4 as uuidv4 } from "uuid";

import "./MySupportMsg.css";
import Button from "../../shared/components/UIElements/Button";
import ErrorModal from "../../shared/components/error/ErrorModal";

const MySupportMsg = (props) => {
  const auth = useContext(AuthContext);
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState();
  const [changeCheckStatus, setChangeCheckStatus] = useState(false);
  const [deleteCheckStatus, setDeleteCheckStatus] = useState(false);
  const history = useHistory();
  const [supportArr, setSupportArr] = useState([]);
  const supportMessage = [];

  const changeCheckHandler = () => {
    setChangeCheckStatus(true);
  };

  const deleteCheckHandler = () => {
    setDeleteCheckStatus(true);
  };

  const goToBackPageHandler = () => {
    history.replace(`/mypage`);
  };

  const errorModalCloseHandler = () => {
    setError(false);
  };

  useEffect(() => {
    const getSupportMessage = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/mypage/support`,
          {
            headers: {
              Authorization: `Bearer ${auth.token}`,
            },
          }
        );

        const responseData = await response.json();

        if (!response.ok) {
          throw new Error(responseData.message);
        }
        await responseData.mySupportMessageJson.forEach((el) => {
          supportMessage.push(el);
        });

        await setSupportArr(supportMessage);
      } catch (err) {
        setErrorMsg(err.message);
        setError(true);
      }
    };
    getSupportMessage();
    setChangeCheckStatus(false);
    setDeleteCheckStatus(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [changeCheckStatus, deleteCheckStatus]);

  return (
    <React.Fragment>
      {error && (
        <ErrorModal errorMsg={errorMsg} onClose={errorModalCloseHandler} />
      )}
      <div className="support">
        <div className="support-container">
          <h1 className="support-header"> 나의 모든 Support Message </h1>
          <div className="support-main">
            <ul className="support-body">
              {supportArr.map((el) => {
                return (
                  <li className="support-message" key={uuidv4()}>
                    <SupportMessage
                      title={el.title}
                      body={el.body}
                      nickname={el.nickname}
                      creator={el.creator}
                      id={el.id}
                      indieName={el.indieName}
                      onEdit={changeCheckHandler}
                      onDelete={deleteCheckHandler}
                    />
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="support-button__container">
            <Button
              className="back-Btn__mypage-support"
              onClick={goToBackPageHandler}
            >
              뒤로가기
            </Button>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default MySupportMsg;
