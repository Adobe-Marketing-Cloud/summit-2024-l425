import React, { useEffect, useMemo } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Container from "../components/base/Container";
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
  // const [fetchTrigger, setFetchTrigger] = useState(true);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const selectedVariation = useMemo(
    () => searchParams.get("variation") || "master",
    [searchParams]
  );

  const { data } = usePageBySlug("home", selectedVariation);

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

  if (!data || !categories.hasOwnProperty(selectedVariation)) return;

  const image = data?.image?._dynamicUrl;
  const title = data?.title;
  const content = data?.content;
  const featuredServices = data?.featuredServices;

  return (
    <>
      <ContentFragment cf={data} className="home-wrapper">
        <div className="variations-wrapper">
          {Object.entries(categories).map(([variation, label], index) => (
            <SelectorButton
              key={`${variation}_${index}`}
              onClick={() => navigate(`/?variation=${variation}`)}
              isSelected={selectedVariation === variation}
            >
              {label}
            </SelectorButton>
          ))}
        </div>
        <Hero image={image} title={title} content={content} />
        <img src={phones} id="parallax-item" alt="Phone" />
        <Container prop="featuredServices" label="Featured Services">
          <TeaserSection title="Featured Services" cfs={featuredServices} />
        </Container>
      </ContentFragment>
      <CallToActionSection />
    </>
  );
};

export default Home;
