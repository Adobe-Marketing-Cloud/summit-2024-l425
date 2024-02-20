import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import PropTypes from "prop-types";
import { getURI } from "./util/Utils";

import './ParallaxTeaser.css';

const ParallaxTeaser = (
  {
    image,
    title,
    text = ''
  }
) => {
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const position = window.scrollY;
      setScrollPosition(position);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="parallax-container">
      <div className="parallax-image"
        data-aue-prop="image"
        data-aue-type="media"
        data-aue-label="Page image"
        style={{
          backgroundImage: `url(${getURI(image)})`
        }} />
      <div className="text-overlay">
        <h1>{title}</h1>
        <p>{text}</p>
      </div>
    </div>
  );
}

ParallaxTeaser.propTypes = {
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired
};

export default ParallaxTeaser;
