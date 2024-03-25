import React from "react";
import {Link} from "react-router-dom";

const RedirectButton = ({ children, href = "/", className }) => {
  return (
    <Link to={href}>
      <button className={className}>{children}</button>
    </Link>
  );
};

export default RedirectButton;
