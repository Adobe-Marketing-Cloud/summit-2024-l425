import React, { useState, useMemo, useEffect } from "react";
import Hero from "../components/Hero";
import TeaserCard from "../components/TeaserCard";
import CallToActionSection from "../components/CallToActionSection";
import ContentFragment from "../components/base/ContentFragment";
import Title from "../components/base/Title";
import Container from "../components/base/Container";
import phones from "../assets/phones.png";
import { usePageBySlug } from "../api/usePersistedQueries";
import "./Home.scss";

const Home = () => {
  const [selectedVariation, setSelectedVariation] = useState("master");
  const { data } = usePageBySlug("home", selectedVariation);

  const categories = useMemo(() => {
    const map = { master: "Personal" };
    const variations = data?.teasers?._variations;
    if (variations) {
      variations.forEach((variation) => {
        map[variation] = variation[0].toUpperCase() + variation.slice(1);
      });
    }
    return map;
  }, [data]);

  useEffect(() => {
    const scrollHandler = () => {
      const parallaxItem = document.getElementById("parallax-item");
      const scrollPosition = window.scrollY;

      const opacity = 1 - (scrollPosition / window.innerHeight) * 4;
      const initialTopPosition = 550;
      const scrollSpeed = 0.6;
      const newTopPosition = initialTopPosition + scrollPosition * scrollSpeed;

      parallaxItem.style.top = newTopPosition + "px";
      parallaxItem.style.opacity = opacity;
    };

    window.addEventListener("scroll", scrollHandler);

    return () => {
      window.addEventListener("scroll", scrollHandler);
    };
  }, []);

  if (!data) return;

  const teasers = data?.teasers;
  const { title, relatedOffers } = teasers;

  return (
    <>
      <ContentFragment cf={data} className="home-wrapper">
        <Hero cf={data} />
        <img src={phones} id="parallax-item" alt="Phone" />
        <ContentFragment
          tag="section"
          cf={teasers}
          className="container teasers-wrapper"
        >
          <div className="category-wrapper">
            {Object.entries(categories).map(([variation, label]) => (
              <button
                key={variation}
                onClick={() => setSelectedVariation(variation)}
                className={`font-size-medium${
                  selectedVariation === variation ? " selected" : ""
                }`}
              >
                {label}
              </button>
            ))}
          </div>
          <Title heading="h2" prop="title" className="color-dark">
            {title}
          </Title>
          <Container
            prop="relatedOffers"
            label="Related Offers"
            className="teasers-container"
          >
            {relatedOffers.map((teaser, index) => (
              <TeaserCard
                key={teaser?.title}
                cf={teaser}
                reverse={index % 2 !== 0}
              />
            ))}
          </Container>
        </ContentFragment>
      </ContentFragment>
      <CallToActionSection />
    </>
  );
};

export default Home;
