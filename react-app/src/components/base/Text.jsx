import React from "react";

const Text = ({ children, tag, className, prop, type, label, behavior }) => {
  const editorProps = {
    "data-aue-prop": prop,
    "data-aue-type": type || "richtext",
    "data-aue-label": label || (prop && prop[0].toUpperCase() + prop.slice(1)),
    "data-aue-behavior": behavior,
  };

  const Component = tag || "p";

  return (
    <Component className={className} {...editorProps}>
      {children || ""}
    </Component>
  );
};

export default Text;
