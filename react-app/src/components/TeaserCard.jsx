import React from "react";
import PropTypes from "prop-types";
import Picture from "./Picture";

import "./TeaserCard.css";
import ContentFragment from "./util/ContentFragment";

const TeaserCard = ({ cf }) => {
  return (
    <article className="article-wrapper">
      <ContentFragment cf={cf}>
        <Picture
          dynamicUrl={cf.icon?._dynamicUrl}
          alt={cf.icon?.title || cf.title}
          sources={[
            { minWidth: 1024, width: 416 },
            { minWidth: 0, width: 200 },
          ]}
        />
        <div className="article-body">
          <h3 data-aue-prop="title" data-aue-type="text" data-aue-label="Title">
            {cf?.title}
          </h3>
          <p
            data-aue-prop="description"
            data-aue-type="richtext"
            data-aue-label="Description"
          >
            {cf?.description?.plaintext}
          </p>
          <a href="#" className="read-more">
            Read more <span className="sr-only">about this is some title</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="icon"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </a>
        </div>
      </ContentFragment>
    </article>
  );
};

TeaserCard.propTypes = {
  cf: PropTypes.object.isRequired,
};

export default TeaserCard;
