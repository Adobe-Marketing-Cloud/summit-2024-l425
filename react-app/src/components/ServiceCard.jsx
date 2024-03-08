import React from "react";
import Image from "./base/Image";
import Title from "./base/Title";
import Text from "./base/Text";
import ContentFragment from "./base/ContentFragment";
import arrowRight from "../assets/arrow-right.svg";
import "./ServiceCard.scss";

const ServiceCard = ({ cf, navigate }) => {
  const image = cf?.icon?._dynamicUrl;
  const title = cf?.title;
  const content = cf?.description;
  const slug = cf?.slug;
  const category = cf?.serviceCategory?.name;
  const path = `/services/${slug}`;

  return (
    <ContentFragment
      cf={cf}
      className="card-horizontal hover-effect service-card-wrapper"
    >
      <Image src={image} alt={`${title} illustration`} prop="image" />
      <div className="right-wrapper">
        <div className="content-wrapper">
          {category && (
            <p className="category color-blue font-size-small font-weight-medium">
              {category}
            </p>
          )}
          <Title heading="h5" prop="title" className="color-dark">
            {title}
          </Title>
          <Text
            content={content}
            prop="description"
            className="font-size-large"
          />
        </div>
        <button onClick={() => navigate(path)} className="secondary">
          Learn More
          <img src={arrowRight} alt="Right arrow icon" className="icon" />
        </button>
      </div>
    </ContentFragment>
  );
};

export default ServiceCard;
