import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import PropTypes from "prop-types";

import { getURI } from "./util/Utils";
import ContentFragment from "./util/ContentFragment";

import "./ParallaxTeaser.css";

const ParallaxTeaser = ({ cf }) => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const image = cf.image?._dynamicUrl;
  const title = cf.image?.title || cf.title || "";
  const text = cf.content?.plaintext || "";

  useEffect(() => {
    const handleScroll = () => {
      const position = window.scrollY;
      setScrollPosition(position);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <ContentFragment cf={cf} className="parallax-container">
      <div
        className="parallax-image"
        data-aue-prop="image"
        data-aue-type="media"
        data-aue-label="Image"
        style={{
          backgroundImage: `url(${getURI(image)})`,
        }}
      />
      <div className="text-overlay">
        <h1 data-aue-prop="title" data-aue-type="text" data-aue-label="Title">
          {title}
        </h1>
        <p
          data-aue-prop="content"
          data-aue-type="richtext"
          data-aue-label="Content"
        >
          {text}
        </p>
      </div>
    </ContentFragment>
  );
};

ParallaxTeaser.propTypes = {
  cf: PropTypes.object.isRequired,
};

export default ParallaxTeaser;
