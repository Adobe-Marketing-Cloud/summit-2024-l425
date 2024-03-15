import React, { useState, useEffect, useMemo } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import ContentFragment from "../components/base/ContentFragment";
import Hero from "../components/Hero";
import SelectorButton from "../components/SelectorButton";
import TeaserSection from "../components/TeaserSection";
import CallToActionSection from "../components/CallToActionSection";
import phones from "../assets/phones.png";
import { snakeCaseToTitleCase } from "../utils";
import { usePageBySlug } from "../api";
import "./Home.scss";

const Home = () => {
  const [fetchTrigger, setFetchTrigger] = useState(true);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const selectedVariation = useMemo(
    () => searchParams.get("variation") || "master",
    [searchParams]
  );

  const { data } = usePageBySlug("home", selectedVariation, fetchTrigger);

  const categories = useMemo(() => {
    const map = { master: "Personal Banking" };
    const variations = data?._variations;
    if (variations) {
      variations.forEach((variation) => {
        map[variation] = snakeCaseToTitleCase(variation);
      });
    }
    return map;
  }, [data?._variations]);

  useEffect(() => {
    if (!searchParams.get("variation")) {
      navigate("/?variation=master");
    }
  }, [searchParams, navigate]);

  useEffect(() => {
    const scrollHandler = () => {
      const parallaxItem = document.getElementById("parallax-item");
      const scrollPosition = window.scrollY;

      const opacity = 1 - (scrollPosition / window.innerHeight) * 4;
      const initialTopPosition = 650;
      const scrollSpeed = 0.6;
      const newTopPosition = initialTopPosition + scrollPosition * scrollSpeed;

      parallaxItem.style.top = newTopPosition + "px";
      parallaxItem.style.opacity = opacity;
    };

    const updateHandler = () => {
      alert("Content Updated");
    };

    document.addEventListener("scroll", scrollHandler);
    document.addEventListener("aue:content-update", updateHandler);

    return () => {
      document.removeEventListener("scroll", scrollHandler);
      document.removeEventListener("aue:content-update", updateHandler);
    };
  }, []);

  if (!data || !categories.hasOwnProperty(selectedVariation)) return;

  const image = data?.image?._dynamicUrl;
  const title = data?.title;
  const content = data?.content;
  const featuredServices = data?.featuredServices;

  return (
    <>
      <ContentFragment cf={data}>
        <div className="background-blue">
          <div className="container variations-wrapper">
            {Object.entries(categories).map(([variation, label], index) => (
              <SelectorButton
                key={`${variation}_${index}`}
                variant="light"
                onClick={() => navigate(`/?variation=${variation}`)}
                isSelected={selectedVariation === variation}
              >
                {label}
              </SelectorButton>
            ))}
          </div>
        </div>
        <Hero image={image} title={title} content={content} />
        <img src={phones} id="parallax-item" alt="Phone" />
        <TeaserSection
          cfs={featuredServices}
          title="Featured Services"
          containerProps={{
            prop: "featuredServices",
            label: "Featured Services",
          }}
          setFetchTrigger={setFetchTrigger}
        />
      </ContentFragment>
      <CallToActionSection />
    </>
  );
};

export default Home;
