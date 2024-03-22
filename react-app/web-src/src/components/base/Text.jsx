import React from "react";

const Text = ({ children, content, className, prop, label, behavior }) => {
  let Component = null;

  if (children || content?.plaintext) {
    Component = (
      <div className={className}>
        {children || content.plaintext}
      </div>
    );
  } else if (content?.html) {
    Component = (
      <div
        className={className}
        dangerouslySetInnerHTML={{ __html: content.html }}
      />
    );
  }

  return Component;
};

export default Text;
