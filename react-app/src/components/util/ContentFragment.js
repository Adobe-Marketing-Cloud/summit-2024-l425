import React from "react";

const defaultAttributes = {
  type: "reference",
  filter: "cf",
  behavior: "cf",
};

const ContentFragment = ({
  children,
  cf,
  attributes: overwrite,
  className,
}) => {
  const attributes = { ...defaultAttributes, ...overwrite };

  // Collect the title from the CF metadata (not the actual data, but the metadata of the CF itself)
  let title = "";
  if (cf._metadata && cf._metadata.stringMetadata) {
    title =
      cf._metadata.stringMetadata.filter((meta) => meta.name === "title")[0]
        ?.value || null;
  }

  // Construct a nicer label that includes the CF model title and the title of the CF (from the metadata)
  const label =
    attributes?.label || cf._model.title + (title ? ` (${title})` : "");

  // Wrap the new Content Fragment with the necessary data-aue attributes, so we don't have to do this in every component.
  // The appropriate values for these various models needs to be reviewed; im not sure if they are correct/make sense.
  return (
    <div
      data-aue-resource={`urn:aemconnection:${cf._path}/jcr:content/data/${cf._variation}`}
      data-aue-type={attributes.type}
      data-aue-behavior={attributes.behavior}
      data-aue-filter={attributes.filter}
      data-aue-label={label}
      className={className}
    >
      {children}
    </div>
  );
};

export default ContentFragment;
