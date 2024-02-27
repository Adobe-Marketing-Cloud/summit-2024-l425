import React from "react";

const Text = ({ content, className, prop, label, behavior }) => {
  const editorProps = {
    "data-aue-prop": prop,
    "data-aue-label": label || (prop && prop[0].toUpperCase() + prop.slice(1)),
    "data-aue-behavior": behavior,
  };

  let Component = null;

  if (typeof content === "string" || content?.plaintext) {
    Component = (
      <div {...editorProps} data-aue-type="text" className={className}>
        {typeof content === "string" ? content : content.plaintext}
      </div>
    );
  } else if (content?.html) {
    Component = (
      <div
        {...editorProps}
        data-aue-type="richtext"
        className={className}
        dangerouslySetInnerHTML={{ __html: content.html }}
      />
    );
  }

  return Component;
};

export default Text;
