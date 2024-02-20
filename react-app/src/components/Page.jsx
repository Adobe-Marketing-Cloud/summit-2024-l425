import React from "react";
import PropTypes from "prop-types";
import ContentFragment from "./util/ContentFragment";
import Teaser from './ParallaxTeaser'
import TeaserList from "./TeaserList";
import ParallaxTeaser from "./ParallaxTeaser";

const Page = ({ cf }) => {
  return (
    <div className="page offer">
      <ParallaxTeaser
          image={cf.image?._dynamicUrl}
          title={cf.image?.title || cf.title}
          text={cf?.content?.plaintext}
        />

      <TeaserList cf={cf.teasers} />

      {
        cf.related &&
          <ContentFragment cf={cf.related} />
      }
    </div>
  );
};

Page.MODEL = "page";

Page.propTypes = {
  cf: PropTypes.object.isRequired,
};

export default Page;
