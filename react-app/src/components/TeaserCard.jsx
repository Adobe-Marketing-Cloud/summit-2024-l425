import React from "react";
import Image from "./base/Image";
import ContentFragment from "./base/ContentFragment";
import Title from "./base/Title";
import Text from "./base/Text";
import RedirectButton from "./RedirectButton";
import arrowRight from "../assets/arrow-right.svg";
import "./TeaserCard.scss";

const TeaserCard = ({ cf }) => {
  const image = cf?.icon?._dynamicUrl;
  const title = cf?.title;
  const content = cf?.description;
  const path = `/services/${cf.slug}`;

  return (
    <ContentFragment
      cf={cf}
      behavior="component"
      className="hover-effect teaser-wrapper"
    >
      <Image src={image} alt={`${title} illustration`} prop="icon" />
      <div className="content-button-wrapper">
        <div className="content-wrapper">
          <Title heading="h2" prop="title" className="color-dark">
            {title}
          </Title>
          <Text content={content} prop="description" />
        </div>
        <RedirectButton href={path}>
          Learn More
          <img src={arrowRight} alt="Right arrow icon" className="icon" />
        </RedirectButton>
      </div>
    </ContentFragment>
  );
};

export default TeaserCard;
