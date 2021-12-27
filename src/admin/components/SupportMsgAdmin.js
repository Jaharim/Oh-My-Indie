import React, { useContext, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import SupportMessage from "../../indies/components/SupportMessage";

import "./SupportMsgAdmin.css";
import Button from "../../shared/components/UIElements/Button";
import { AuthContext } from "../../shared/components/context/auth-context";
import ErrorModal from "../../shared/components/error/ErrorModal";

const SupportMsgAdmin = (props) => {
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
    history.replace(`/admin`);
  };

  const errorModalCloseHandler = () => {
    setError(false);
  };

  useEffect(() => {
    const getSupportMessage = async () => {
      try {
        const response = await fetch(`http://localhost:5000/admin/support`, {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        });

        const responseData = await response.json();

        if (!response.ok) {
          throw new Error(responseData.message);
        }
        await responseData.supportMessageJson.map((el) => {
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
  }, [changeCheckStatus, deleteCheckStatus]);

  return (
    <React.Fragment>
      {error && (
        <ErrorModal errorMsg={errorMsg} onClose={errorModalCloseHandler} />
      )}
      <div className="support">
        <div className="support-container">
          <h1 className="support-header"> Support Messages </h1>
          <div className="support-main">
            <ul className="support-body">
              {supportArr.map((el) => {
                return (
                  <li className="support-message">
                    <SupportMessage
                      title={el.title}
                      body={el.body}
                      nickname={el.nickname}
                      creator={el.creator}
                      id={el.id}
                      indieName={el.indieName}
                      status={"admin"}
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
              className="back-Btn__support-admin"
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

export default SupportMsgAdmin;
