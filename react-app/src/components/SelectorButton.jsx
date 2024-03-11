import React from "react";
import "./SelectorButton.scss";

const SelectorButton = ({ children, variant, onClick, isSelected }) => {
  return (
    <button
      onClick={onClick}
      className={`font-size-medium selector-button${
        variant === "light" ? " light" : " dark"
      }${isSelected ? " selected" : ""}`}
    >
      {children}
    </button>
  );
};

export default SelectorButton;
