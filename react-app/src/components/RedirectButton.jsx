import React from "react";

const RedirectButton = ({ children, href = "/", className }) => {
  return (
    <a href={href}>
      <button className={className}>{children}</button>
    </a>
  );
};

export default RedirectButton;
