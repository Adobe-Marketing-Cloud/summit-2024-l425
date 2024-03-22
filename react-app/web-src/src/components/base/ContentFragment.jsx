import React from "react";

const ContentFragment = ({
  children,
  tag,
  className,
}) => {
  const Component = tag || "div";

  return (
    <Component className={className}>
      {children}
    </Component>
  );
};

export default ContentFragment;
