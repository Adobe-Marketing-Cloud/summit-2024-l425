import Page from "../Page";
import Article from "../Article";
import Service from "../Service";

import React from "react";
import PropTypes from "prop-types";

const ROOT_MODELS_FOLDER = "/conf/securbank/settings/dam/cfm/models";

const defaultMapping = { 
  type: "reference",
  filter: "cf",
  model: "component",
  behavior: "component"
}

let mapping = {};
const components = [
  Page,
  Article,
  Service
];

components.forEach(element => {
  mapping[ROOT_MODELS_FOLDER + "/" + element.MODEL] = {
    ...defaultMapping,
    component: element
  };
});

const ContentFragment = ({ cf }) => {
  // Collect the configuration mapping based on the CF Model
  const config = mapping[cf._model?._path];

  // Collect the title from the CF metadata (not the actual data, but the metadata of the CF itself)
  var title = '';
  if (cf._metadata && cf._metadata.stringMetadata) {
    title = cf._metadata.stringMetadata.filter((meta) => meta.name === "title")[0]?.value || null;
  }
  // Construct a nicer label that includes the CF model title and the title of the CF (from the metadata)
  const label = cf._model.title + (title ? ` (${title})` : "")

  // This should never happen! Probably should handle this more nicely, but this is helpful for now.
  if (!config.component) {
    return <div>Unknown model: {cf._model?._path}</div>;
  }

  // Wrap the new Content Fragment with the necessary data-aue attributes, so we don't have to do this in every component.
  // The appropriate values for these various models needs to be reviewed; im not sure if they are correct/make sense.
  return (
    <div
      data-aue-resource={`urn:aemconnection:${cf._path}/jcr:content/data/${cf._variation}`}
      data-aue-type={config.type}
      data-aue-behavior={config.behavior}
      data-aue-model={config.model}
      data-aue-filter={config.filter}
      data-aue-label={label}
    >
      {/* Render the component with the collected configuration */}
      <config.component cf={cf} />
    </div>
  );
};

ContentFragment.propTypes = {
  cf: PropTypes.object.isRequired,
};

export default ContentFragment;
