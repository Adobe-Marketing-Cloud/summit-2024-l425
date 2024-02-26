import React from "react";
import Title from "./base/Title";
import Image from "./base/Image";
import Text from "./base/Text";
import "./Hero.scss";

const Hero = ({ cf }) => {
  const image = cf?.image?._dynamicUrl;
  const title = cf?.title;
  const description = cf?.content?.plaintext;

  return (
    <div className="background-blue">
      <div className="outer-wrapper hero-wrapper">
        <div className="content-button-wrapper">
          <div className="content-wrapper">
            <Title tag="h1" className="color-light" prop="title">
              {title}
            </Title>
            <Text prop="content">{description}</Text>
          </div>
          <a href="/services">
            <button>Our Services</button>
          </a>
        </div>
        <Image src={image} alt="Hero banner" prop="image" />
      </div>
    </div>
  );
};

export default Hero;
