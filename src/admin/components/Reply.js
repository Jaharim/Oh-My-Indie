import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../shared/components/context/auth-context";
import Button from "../../shared/components/UIElements/Button";

import "./Reply.css";

const Reply = (props) => {
  const auth = useContext(AuthContext);
  const [error, setError] = useState();
  const [content, setContent] = useState();
  const closeReplyModal = () => {
    props.onClose();
  };

  useEffect(() => {
    console.log(props.props.id);
    const getReplyContent = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/admin/contact/complete/${props.props.id}`,
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
        console.log("success");

        setContent(responseData.content);
      } catch (err) {
        console.log(err);
        setError(err.message || "Something went wrong, please try again");
      }
    };
    getReplyContent();
  }, []);
  return (
    <div className="reply-modal">
      <div className="reply-form">
        <div className="reply-form-content">
          <div className="reply-content-header">
            안녕하세요, {props.props.nickname} 님!
          </div>
          <div>{content}</div>
          <div className="reply-content-tail">
            항상 저희 Oh, My Indie!를 이용해주셔서 감사합니다. <br />더 좋은
            서비스로 찾아뵐 수 있도록 노력하겠습니다.
          </div>
        </div>
        <Button onClick={closeReplyModal}>닫기</Button>
      </div>
    </div>
  );
};

export default Reply;
