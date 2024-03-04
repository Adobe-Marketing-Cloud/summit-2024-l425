import React from "react";
import "./SelectorButton.scss";

const SelectorButton = ({ children, onClick, isSelected }) => {
  return (
    <button
      onClick={onClick}
      className={`font-size-medium selector-button${
        isSelected ? " selected" : ""
      }`}
    >
      {children}
    </button>
  );
};

export default SelectorButton;
