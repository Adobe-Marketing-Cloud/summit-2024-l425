import React from "react";
import Image from "./base/Image";
import Title from "./base/Title";
import Text from "./base/Text";
import ContentFragment from "./base/ContentFragment";
import RedirectButton from "./RedirectButton";
import arrowRight from "../assets/arrow-right.svg";
import "./ServiceCard.scss";

const ServiceCard = ({ cf }) => {
  const image = cf?.icon?._dynamicUrl;
  const title = cf?.title;
  const content = cf?.description;
  const slug = cf?.slug;
  const category = cf?.serviceCategory?.name;
  const duration = cf?.duration;
  const path = `/services/${slug}`;

  return (
    <ContentFragment
      cf={cf}
      className="card-horizontal hover-effect service-card-wrapper"
    >
      <Image src={image} alt={`${title} illustration`} prop="image" />
      <div className="right-wrapper">
        <div className="content-wrapper">
          <div className="tag-wrapper">
            {category && (
              <p
                data-aue-prop="serviceCategory"
                data-aue-label="Service Category"
                className="category color-blue font-size-small font-weight-medium"
              >
                {category}
              </p>
            )}
            <div className="duration-wrapper">
              Duration
              <Text prop="duration">{duration}</Text>
              mins
            </div>
          </div>
          <Title heading="h5" prop="title" className="color-dark">
            {title}
          </Title>
          <Text
            content={content}
            prop="description"
            className="font-size-large"
          />
        </div>
        <RedirectButton href={path} className="secondary">
          Learn More
          <img src={arrowRight} alt="Right arrow icon" className="icon" />
        </RedirectButton>
      </div>
    </ContentFragment>
  );
};

export default ServiceCard;
