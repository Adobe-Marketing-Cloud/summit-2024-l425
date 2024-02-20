import React from "react";
import PropTypes from "prop-types";
import Picture from "./Picture";

import './Service.css';

const Service = ({ cf }) => {
  return (
    <article>
      <div class="article-wrapper">
        <Picture dynamicUrl={cf.icon?._dynamicUrl} 
          alt={cf.icon?.title || cf.title}
          sources={[
            { minWidth: 1024, width: 416 },
            { minWidth: 0, width: 200 },
          ]}
        />
        <div class="article-body">
          <h3
            data-aue-prop="title"
            data-aue-type="text"
            data-aue-label="Page title"
          >
            {cf?.title}
          </h3>
          <p>
          {cf?.description?.plaintext}
          </p>
          <a href="#" class="read-more">
            Read more <span class="sr-only">about this is some title</span>
            <svg xmlns="http://www.w3.org/2000/svg" class="icon" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </a>
        </div>
      </div>
    </article>
  );
};

Service.MODEL = "service";

Service.propTypes = {
  cf: PropTypes.object.isRequired,
};

export default Service;
