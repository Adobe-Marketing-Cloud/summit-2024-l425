import React from "react";
import Hero from "../components/Hero";
import TeaserCard from "../components/TeaserCard";
import CallToActionCard from "../components/CallToActionCard";
import Loading from "../components/Loading";
import ContentFragment from "../components/base/ContentFragment";
import Title from "../components/base/Title";
import { usePageBySlug } from "../api/usePersistedQueries";
import "./Home.scss";

const Home = () => {
  const { page } = usePageBySlug("home");

  if (!page) return <Loading />;

  return (
    <ContentFragment cf={page}>
      <Hero cf={page} />
      <div className="outer-wrapper">
        <ContentFragment cf={page.teasers} className="teasers-wrapper">
          <Title tag="h2" className="color-dark" prop="title">
            {page.teasers.title}
          </Title>
          {page.teasers.relatedOffers.map((teaser, index) => (
            <TeaserCard
              key={teaser.title}
              cf={teaser}
              reverse={index % 2 !== 0}
            />
          ))}
        </ContentFragment>
        <CallToActionCard />
      </div>
    </ContentFragment>
  );
};

export default Home;
