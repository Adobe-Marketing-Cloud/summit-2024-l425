import React, { useState, useMemo } from "react";
import Hero from "../components/Hero";
import TeaserCard from "../components/TeaserCard";
import CallToActionSection from "../components/CallToActionSection";
import ContentFragment from "../components/base/ContentFragment";
import Title from "../components/base/Title";
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

  if (!data) return;

  const teasers = data?.teasers;
  const { title, relatedOffers } = teasers;

  return (
    <>
      <ContentFragment cf={data}>
        <Hero cf={data} />
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
          {relatedOffers.map((teaser, index) => (
            <TeaserCard
              key={teaser?.title}
              cf={teaser}
              reverse={index % 2 !== 0}
            />
          ))}
        </ContentFragment>
      </ContentFragment>
      <CallToActionSection />
    </>
  );
};

export default Home;
