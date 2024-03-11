import React from "react";

const Container = ({ children, tag, className, prop, label, filter }) => {
  const Component = tag || "div";

  return (
    <Component className={className}>
      {children}
    </Component>
  );
};

export default Container;
