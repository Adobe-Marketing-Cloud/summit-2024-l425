import React from "react";

const Container = ({ children, tag, className, prop, label, filter }) => {
  const editorProps = {
    "data-aue-type": "container",
    "data-aue-prop": prop,
    "data-aue-label": label,
    "data-aue-filter": filter,
  };

  const Component = tag || "div";

  return (
    <Component className={className} {...editorProps}>
      {children}
    </Component>
  );
};

export default Container;
