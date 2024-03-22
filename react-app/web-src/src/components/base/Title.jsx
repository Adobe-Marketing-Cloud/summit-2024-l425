import React from "react";

const Title = ({ children, heading, className, prop, label, behavior }) => {
  const Component = heading || "h1";

  return (
    <Component className={className}>
      {children || ""}
    </Component>
  );
};

export default Title;
