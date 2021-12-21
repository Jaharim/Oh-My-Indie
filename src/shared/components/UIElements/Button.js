import React from "react";

import "./Button.css";

const Button = (props) => {
  return (
    <button
      type={props.type ? props.type : "submit"}
      className={`${props.className} button `}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  );
};

export default Button;
