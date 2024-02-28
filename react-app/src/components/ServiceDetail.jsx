import React, { useEffect } from "react";
import ContentFragment from "./base/ContentFragment";
import Title from "./base/Title";
import Image from "./base/Image";
import Text from "./base/Text";
import { useServiceBySlug } from "../api/usePersistedQueries";
import "./ServiceDetail.scss";

const ServiceDetail = ({ slug }) => {
  const { data } = useServiceBySlug(slug);

  useEffect(() => {
    if (data) {
      window.scrollTo(0, 0);
    }
  }, [data]);

  if (!data) return;

  const image = data?.icon?._dynamicUrl;
  const title = data?.title;
  const content = data?.description;
  const category = data?.serviceCategory?.name;
  const duration = data?.duration;

  return (
    <ContentFragment
      tag="section"
      cf={data}
      className="container service-detail-wrapper"
    >
      <div className="left-wrapper">
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
          <Title heading="h1" prop="title" className="color-dark">
            {title}
          </Title>
          <Text content={content} prop="description" />
        </div>
        <button>Book Now</button>
      </div>
      <Image src={image} alt={`${title} illustration`} prop="image" />
    </ContentFragment>
  );
};

export default ServiceDetail;