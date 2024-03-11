import React from "react";
import Image from "./base/Image";
import Title from "./base/Title";
import ContentFragment from "./base/ContentFragment";
import RedirectButton from "./RedirectButton";
import arrowRight from "../assets/arrow-right.svg";
import "./ArticleCard.scss";

const ArticleCard = ({ cf }) => {
  const image = cf?.image?._dynamicUrl;
  const title = cf?.title;
  const path = `/articles/${cf.slug}`;

  return (
    <ContentFragment
      cf={cf}
      behavior="component"
      className="card-vertical hover-effect article-card-wrapper"
    >
      <Image src={image} alt={`${title} illustration`} prop="image" />
      <Title heading="h5" prop="title" className="color-dark">
        {title}
      </Title>
      <RedirectButton href={path} className="secondary">
        Learn More
        <img src={arrowRight} alt="Right arrow icon" className="icon" />
      </RedirectButton>
    </ContentFragment>
  );
};

export default ArticleCard;
