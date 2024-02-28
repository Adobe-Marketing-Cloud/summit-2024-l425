import React from "react";
import Hero from "../components/Hero";
import TeaserCard from "../components/TeaserCard";
import CallToActionSection from "../components/CallToActionSection";
import ContentFragment from "../components/base/ContentFragment";
import Title from "../components/base/Title";
import { usePageBySlug } from "../api/usePersistedQueries";
import "./Home.scss";

const Home = () => {
  const { data } = usePageBySlug("home");

  if (!data) return;

  const title = data?.teasers?.title;

  return (
    <>
      <ContentFragment cf={data}>
        <Hero cf={data} />
        <ContentFragment
          cf={data.teasers}
          className="container teasers-wrapper"
        >
          <Title heading="h2" prop="title" className="color-dark">
            {title}
          </Title>
          {data?.teasers?.relatedOffers.map((teaser, index) => (
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
