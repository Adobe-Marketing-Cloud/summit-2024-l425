import React from "react";
import PropTypes from "prop-types";

const AEM_HOST = process.env.REACT_APP_HOST_URI;

const Picture = ({
  dynamicUrl,
  alt = 'SecurBank Image',
  sources
}) => {
  if (!dynamicUrl) {
    return null;
  }

  sources = sources || [];

  const sourcesTags = sources.filter((source) => (source.minWidth));
  let imgTags = sources.filter((source) => (!source.minWidth));
  imgTags = imgTags.length > 0 ? imgTags[0] : [{ minWidth: 0, width: 1200 }];
  
  return (
    <picture>
      {sourcesTags.map((source, index) => {  
        return <source key={index} srcSet={setOptimizedImageUrlParams(dynamicUrl, { width: source.width })} media={`(min-width: ${source.minWidth}px)`}/>
      })}

      <img
        src={setOptimizedImageUrlParams(dynamicUrl, {
          width: imgTags.width,
        })}
        alt={alt}
      />
    </picture>
  );
};

Picture.propTypes = {
  dynamicUrl: PropTypes.string.isRequired,
  alt: PropTypes.string,
  sources: PropTypes.arrayOf(
    PropTypes.shape({
      minWidth: PropTypes.number,
      width: PropTypes.number.isRequired,
    })
  ).isRequired
};


export default Picture;

/**
 * Update the dynamic URL with client-specific query parameters
 * @param {*} imageUrl the image URL
 * @param {*} params the AEM web-optimized image query parameters
 * @returns the dynamic URL with the query parameters
 */
function setOptimizedImageUrlParams(imageUrl, params) {
   // replace last / in AEM_HOST with ""
  const aemHost = AEM_HOST.endsWith("/") ? AEM_HOST.slice(0, -1) : AEM_HOST;

  let url = new URL(aemHost + imageUrl);
  Object.keys(params).forEach((key) => {
    url.searchParams.set(key, params[key]);
  });
  return url.toString();
}
