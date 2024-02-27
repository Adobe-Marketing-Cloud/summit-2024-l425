import React from "react";
import Title from "./base/Title";
import Image from "./base/Image";
import Text from "./base/Text";
import RedirectButton from "./RedirectButton";
import "./Hero.scss";

const Hero = ({ cf }) => {
  const image = cf?.image?._dynamicUrl;
  const title = cf?.title;
  const content = cf?.content;

  return (
    <div className="background-blue">
      <div className="container hero-wrapper">
        <div className="content-button-wrapper">
          <div className="content-wrapper">
            <Title heading="h1" prop="title" className="color-light">
              {title}
            </Title>
            <Text content={content} prop="content" className="color-grey" />
          </div>
          <RedirectButton href="/services">Our Services</RedirectButton>
        </div>
        <Image src={image} alt="Hero banner" prop="image" />
      </div>
    </div>
  );
};

export default Hero;
