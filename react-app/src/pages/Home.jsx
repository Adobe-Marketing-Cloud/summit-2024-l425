import React from "react";
import Hero from "../components/Hero";
import TeaserCard from "../components/TeaserCard";
import CallToActionSection from "../components/CallToActionSection";
import Loading from "../components/Loading";
import ContentFragment from "../components/base/ContentFragment";
import Title from "../components/base/Title";
import { usePageBySlug } from "../api/usePersistedQueries";
import "./Home.scss";

const Home = () => {
  const { page } = usePageBySlug("home");

  if (!page) return <Loading />;

  const title = page?.teasers?.title;

  return (
    <ContentFragment cf={page}>
      <Hero cf={page} />
      <div className="container">
        <ContentFragment cf={page.teasers} className="teasers-wrapper">
          <Title heading="h2" prop="title" className="color-dark">
            {title}
          </Title>
          {page?.teasers?.relatedOffers.map((teaser, index) => (
            <TeaserCard
              key={teaser?.title}
              cf={teaser}
              reverse={index % 2 !== 0}
            />
          ))}
        </ContentFragment>
        <CallToActionSection />
      </div>
    </ContentFragment>
  );
};

export default Home;
