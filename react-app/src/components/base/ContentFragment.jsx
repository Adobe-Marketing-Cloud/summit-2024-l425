import React from "react";

const ContentFragment = ({
  children,
  tag,
  className,
  cf,
  prop,
  label,
  behavior,
  filter,
}) => {
  let title = "";
  if (cf?._metadata && cf?._metadata?.stringMetadata) {
    title =
      cf?._metadata?.stringMetadata.filter((meta) => meta?.name === "title")[0]
        ?.value || null;
  }

  const compositeLabel =
    label || cf?._model?.title + (title ? ` (${title})` : "");

  const editorProps = {
    "data-aue-resource": `urn:aemconnection:${cf?._path}/jcr:content/data/${
      cf?._variation || "master"
    }`,
    "data-aue-prop": prop,
    "data-aue-type": "reference",
    "data-aue-label": compositeLabel,
    "data-aue-behavior": behavior,
    "data-aue-filter": filter,
  };

  const Component = tag || "div";

  return (
    <Component className={className} {...editorProps}>
      {children}
    </Component>
  );
};

export default ContentFragment;
