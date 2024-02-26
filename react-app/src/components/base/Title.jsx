import React from "react";

const Title = ({ children, tag, className, prop, type, label, behavior }) => {
  const editorProps = {
    "data-aue-prop": prop,
    "data-aue-type": type || "text",
    "data-aue-label": label || (prop && prop[0].toUpperCase() + prop.slice(1)),
    "data-aue-behavior": behavior,
  };

  const Component = tag || "h1";

  return (
    <Component className={className} {...editorProps}>
      {children || ""}
    </Component>
  );
};

export default Title;
