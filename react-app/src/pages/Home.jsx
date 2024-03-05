import React, { useEffect } from "react";
import Container from "../components/base/Container";
import ContentFragment from "../components/base/ContentFragment";
import Hero from "../components/Hero";
import TeaserSection from "../components/TeaserSection";
import CallToActionSection from "../components/CallToActionSection";
import phones from "../assets/phones.png";
import { usePageBySlug } from "../api/usePersistedQueries";
import "./Home.scss";

const Home = () => {
  const { data } = usePageBySlug("home");

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

    document.addEventListener("scroll", scrollHandler);

    return () => {
      document.removeEventListener("scroll", scrollHandler);
    };
  }, []);

  if (!data) return;

  const image = data?.image?._dynamicUrl;
  const title = data?.title;
  const content = data?.content;
  const teaserListPath = data?.teasers?._path;

  return (
    <>
      <ContentFragment cf={data} className="home-wrapper">
        <Hero image={image} title={title} content={content} />
        <img src={phones} id="parallax-item" alt="Phone" />
        <Container prop="teasers" label="Teasers">
          <TeaserSection cfPath={teaserListPath} />
        </Container>
      </ContentFragment>
      <CallToActionSection />
    </>
  );
};

export default Home;
