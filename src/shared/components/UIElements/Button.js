import React from "react";

import "./Button.css";

const Button = (props) => {
  return (
    <button
      type={props.type ? props.type : "submit"}
      className={`button ${props.className}`}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  );
};

export default Button;
