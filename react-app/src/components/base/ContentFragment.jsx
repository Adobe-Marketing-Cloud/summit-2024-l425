import React from "react";

const ContentFragment = ({
  children,
  tag,
  className,
  cf,
  prop,
  type,
  label,
  behavior,
  filter,
}) => {
  // Collect the title from the CF metadata (not the actual data, but the metadata of the CF itself)
  let title = "";
  if (cf?._metadata && cf?._metadata?.stringMetadata) {
    title =
      cf?._metadata?.stringMetadata.filter((meta) => meta?.name === "title")[0]
        ?.value || null;
  }

  // Construct a nicer label that includes the CF model title and the title of the CF (from the metadata)
  const compositeLabel =
    label || cf?._model?.title + (title ? ` (${title})` : "");

  const editorProps = {
    "data-aue-resource": `urn:aemconnection:${cf._path}/jcr:content/data/${cf._variation}`,
    "data-aue-prop": prop,
    "data-aue-type": type || "reference",
    "data-aue-label": compositeLabel,
    "data-aue-behavior": behavior,
    "data-aue-filter": filter,
  };

  const Component = tag || "div";

  // Wrap the new Content Fragment with the necessary data-aue attributes, so we don't have to do this in every component.
  // The appropriate values for these various models needs to be reviewed; im not sure if they are correct/make sense.
  return (
    <Component className={className} {...editorProps}>
      {children}
    </Component>
  );
};

export default ContentFragment;
