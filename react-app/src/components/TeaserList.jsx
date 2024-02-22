import React from "react";
import PropTypes from "prop-types";

import ContentFragment from "./util/ContentFragment";
import TeaserCard from "./TeaserCard";

import "./TeaserList.css";

const TeaserList = ({ cf }) => {
  return (
    <ContentFragment cf={cf} className={`teaser-list ${cf.style}`}>
      <h2
        className="title"
        data-aue-prop="title"
        data-aue-type="text"
        data-aue-label="Title"
      >
        {cf.title}
      </h2>

      <div
        className="list"
        data-aue-prop="teasers"
        data-aue-type="container"
        data-aue-filter="teaser-list-container"
        data-aue-label="Teasers"
      >
        {cf?.relatedOffers?.map((teaser, index) => (
          <TeaserCard key={index} cf={teaser} />
        ))}
      </div>
    </ContentFragment>
  );
};

TeaserList.propTypes = {
  cf: PropTypes.object.isRequired,
};

export default TeaserList;
