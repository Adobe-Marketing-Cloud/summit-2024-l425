import React from "react";
import { getURI } from "../../utils";

const Image = ({ src, alt, className, prop, type, label, behavior }) => {
  const editorProps = {
    "data-aue-prop": prop || "",
    "data-aue-type": type || "media",
    "data-aue-label":
      label || (prop && prop[0].toUpperCase() + prop.slice(1)) || "",
  };

  return (
    <img
      src={getURI(src || "")}
      alt={alt}
      className={className}
      {...editorProps}
    />
  );
};

export default Image;
