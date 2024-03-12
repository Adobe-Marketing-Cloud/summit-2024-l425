import React, { useEffect } from "react";
import ContentFragment from "./base/ContentFragment";
import Title from "./base/Title";
import Image from "./base/Image";
import Text from "./base/Text";
import RedirectButton from "./RedirectButton";
import { useServiceBySlug } from "../api";
import "./ServiceDetail.scss";

const ServiceDetail = ({ slug }) => {
  const { data } = useServiceBySlug(slug);

  useEffect(() => {
    if (data) {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
    }
  }, [data]);

  if (!data) return;

  const image = data?.icon?._dynamicUrl;
  const title = data?.title;
  const content = data?.description;
  const category = data?.serviceCategory?.name;

  return (
    <ContentFragment
      tag="section"
      cf={data}
      className="container service-detail-wrapper"
    >
      <div className="left-wrapper">
        <div className="content-wrapper">
          {category && (
            <p
              className="category color-blue font-size-small font-weight-medium"
            >
              {category}
            </p>
          )}
          <Title heading="h1" prop="title" className="color-dark">
            {title}
          </Title>
          <Text content={content} prop="description" />
        </div>
        <RedirectButton className="hover-effect">Book Now</RedirectButton>
      </div>
      <Image
        src={image}
        alt={`${title} illustration`}
        prop="image"
        className="hover-effect"
      />
    </ContentFragment>
  );
};

export default ServiceDetail;
