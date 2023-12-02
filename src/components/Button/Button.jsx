import React from "react";
import "./Button.css";

const Button = ({
  icon,
  title,
  width,
  color,
  background,
  height,
  fontsize,
  border,
  navigate,
  borderRadius,
  id,
}) => {
  return (
    <button
      id={id}
      onClick={(e) => {
        navigate(e);
      }}
      className="btn"
      style={{
        height,
        width,
        color,
        background,
        fontSize: fontsize ? fontsize : 14,
        border: border ? border : "none",
        borderRadius: borderRadius ? borderRadius : 8,
      }}
    >
      {icon} {title}
    </button>
  );
};

export default Button;
