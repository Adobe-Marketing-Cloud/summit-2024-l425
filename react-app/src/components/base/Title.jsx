import React from "react";

const Title = ({ children, heading, className, prop, label, behavior }) => {
  const editorProps = {
    "data-aue-prop": prop,
    "data-aue-type": "text",
    "data-aue-label": label || (prop && prop[0].toUpperCase() + prop.slice(1)),
  };

  const Component = heading || "h1";

  return (
    <Component className={className} {...editorProps}>
      {children || ""}
    </Component>
  );
};

export default Title;
