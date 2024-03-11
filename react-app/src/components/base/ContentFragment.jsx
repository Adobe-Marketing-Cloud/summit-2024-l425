import React from "react";

const ContentFragment = ({
  children,
  tag,
  className,
  cf,
  label,
}) => {
  let title = "";
  if (cf?._metadata?.stringMetadata) {
    title =
      cf?._metadata?.stringMetadata.filter((meta) => meta?.name === "title")[0]
        ?.value || null;
  }

  const compositeLabel =
    label || cf?._model?.title + (title ? ` (${title})` : "");

  const Component = tag || "div";

  return (
    <Component className={className}>
      {children}
    </Component>
  );
};

export default ContentFragment;
