import React from "react";
import arrowRight from "../assets/arrow-right.svg";
import Image from "./base/Image";
import ContentFragment from "./base/ContentFragment";
import Title from "./base/Title";
import Text from "./base/Text";
import "./TeaserCard.scss";

const TeaserCard = ({ cf, reverse }) => {
  const image = cf?.icon?._dynamicUrl;
  const title = cf?.title;
  const description = cf?.description?.plaintext;

  return (
    <ContentFragment
      cf={cf}
      className={`teaser-wrapper${reverse ? " reverse" : ""}`}
    >
      <Image src={image} alt={`${title} illustration`} prop="icon" />
      <div className="content-button-wrapper">
        <div className="content-wrapper">
          <Title tag="h2" className="color-dark" prop="title">
            {title}
          </Title>
          <Text prop="description">{description}</Text>
        </div>
        <button>
          {"Learn More"}
          <img src={arrowRight} alt="Right arrow icon" className="icon" />
        </button>
      </div>
    </ContentFragment>
  );
};

export default TeaserCard;
