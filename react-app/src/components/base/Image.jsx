import React from "react";
import { getURI } from "../../utils";

const Image = ({ src, alt, className, prop, type, label, behavior }) => {
  return (
    <img
      src={getURI(src || "")}
      alt={alt}
      className={className}
    />
  );
};

export default Image;
