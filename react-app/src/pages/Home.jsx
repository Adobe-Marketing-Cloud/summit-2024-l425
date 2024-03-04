import React, { useMemo, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Title from "../components/base/Title";
import Container from "../components/base/Container";
import Hero from "../components/Hero";
import TeaserCard from "../components/TeaserCard";
import CallToActionSection from "../components/CallToActionSection";
import ContentFragment from "../components/base/ContentFragment";
import SelectorButton from "../components/SelectorButton";
import phones from "../assets/phones.png";
import { usePageBySlug } from "../api/usePersistedQueries";
import "./Home.scss";

const Home = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const selectedVariation = useMemo(
    () => searchParams.get("variation") || "master",
    [searchParams]
  );
  const [fetchTrigger, setFetchTrigger] = useState(true);

  const { data } = usePageBySlug("home", selectedVariation, fetchTrigger);

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
    if (!searchParams.get("variation")) {
      navigate("/?variation=master");
    }
  }, [searchParams, navigate]);

  useEffect(() => {
    const contentAddHandler = () => {
      setFetchTrigger((state) => !state);
    };

    document.addEventListener("content-add", contentAddHandler);

    return () => {
      window.addEventListener("content-add", contentAddHandler);
    };
  }, []);

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

  if (!data || !categories.hasOwnProperty(selectedVariation)) return;

  const teasers = data?.teasers;
  const { title, relatedOffers } = teasers;

  return (
    <>
      <ContentFragment cf={data} className="home-wrapper">
        <Hero cf={data} />
        <img src={phones} id="parallax-item" alt="Phone" />
        <Container prop="teasers" label="Teasers">
          <ContentFragment
            tag="section"
            cf={teasers}
            className="container teasers-wrapper"
          >
            <div className="category-wrapper">
              {Object.entries(categories).map(([variation, label], index) => (
                <SelectorButton
                  key={`${variation}_${index}`}
                  onClick={() =>
                    (window.location.href = `/?variation=${variation}`)
                  }
                  isSelected={selectedVariation === variation}
                >
                  {label}
                </SelectorButton>
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
                  key={`${teaser?.title}_${index}`}
                  cf={teaser}
                  reverse={index % 2 !== 0}
                />
              ))}
            </Container>
          </ContentFragment>
        </Container>
      </ContentFragment>
      <CallToActionSection />
    </>
  );
};

export default Home;
