import React from "react";
import PropTypes from "prop-types";
import ContentFragment from "./util/ContentFragment";

const Article = ({ cf }) => {
  if (cf.type === "article") {
    return <ArticlePage cf={cf} />;
  } else {
    return <OfferPage cf={cf} />;
  }
};

Article.MODEL = "article";

const OfferPage = ({ cf }) => {
  return (
    <div className="page offer">
      <h1
        data-aue-prop="title"
        data-aue-type="text"
        data-aue-label="Page title"
      >
        OFFER: {cf?.title}
      </h1>

      <div
        data-aue-prop="image"
        data-aue-type="media"
        data-aue-label="Page image"
      >
        {/* <Picture
          dynamicUrl={cf.image?._dynamicUrl}
          alt={cf.image?.title || cf.title}
          sources={[
            { minWidth: 768, width: 1200 },
            { minWidth: 0, width: 320 },
          ]}
        /> */}
      </div>

      <div
        className="text"
        data-aue-prop="content"
        data-aue-type="richtext"
        data-aue-label="Page content"
        dangerouslySetInnerHTML={{ __html: cf?.content?.html }}
      />

      <ContentFragment cf={cf.related} />
    </div>
  );
};

const ArticlePage = ({ cf }) => {
  return (
    <div className="page article">
      <h1
        data-aue-prop="title"
        data-aue-type="text"
        data-aue-label="Title"
      >
        ARTICLE: {cf?.title}
      </h1>

      <div
        data-aue-prop="image"
        data-aue-type="media"
        data-aue-label="Image"
      >
        {/* <Picture
          dynamicUrl={cf.image?._dynamicUrl}
          alt={cf.image?.title || cf.title}
          sources={[
            { minWidth: 768, width: 1200 },
            { minWidth: 0, width: 320 },
          ]}
        /> */}
      </div>

      <div
        className="text"
        data-aue-prop="content"
        data-aue-type="richtext"
        data-aue-label="Content"
        dangerouslySetInnerHTML={{ __html: cf?.content?.html }}
      />

      <ContentFragment cf={cf.related} />
    </div>
  );
};

Article.propTypes = {
  cf: PropTypes.object.isRequired,
};

OfferPage.propTypes = {
  cf: PropTypes.object.isRequired,
};

ArticlePage.propTypes = {
  cf: PropTypes.object.isRequired,
};

export default Article;
