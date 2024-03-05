import React, { useState, useMemo, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Container from "../components/base/Container";
import ContentFragment from "../components/base/ContentFragment";
import Title from "../components/base/Title";
import TeaserCard from "../components/TeaserCard";
import SelectorButton from "../components/SelectorButton";
import { useTeaserListByPath } from "../api/usePersistedQueries";
import "./TeaserSection.scss";

const TeaserSection = ({ cfPath }) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [fetchTrigger, setFetchTrigger] = useState(true);
  const selectedVariation = useMemo(
    () => searchParams.get("variation") || "master",
    [searchParams]
  );

  const { data } = useTeaserListByPath(cfPath, selectedVariation, fetchTrigger);

  const categories = useMemo(() => {
    const map = { master: "Personal" };
    const variations = data?._variations;
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
    const contentAddHandler = (event) => {
      setTimeout(() => {
        setFetchTrigger((state) => !state);
      }, 500);
      event.stopPropagation();
    };

    const contentRemoveHandler = (event) => {
      setTimeout(() => {
        setFetchTrigger((state) => !state);
      }, 500);
      event.stopPropagation();
    };

    document.body.addEventListener("aue:content-add", contentAddHandler);
    document.body.addEventListener("aue:content-remove", contentRemoveHandler);

    return () => {
      document.body.removeEventListener("aue:content-add", contentAddHandler);
      document.body.removeEventListener(
        "aue:content-remove",
        contentRemoveHandler
      );
    };
  }, []);

  if (!data || !categories.hasOwnProperty(selectedVariation)) return;

  const { title, relatedOffers } = data;

  return (
    <ContentFragment
      tag="section"
      cf={data}
      className="container teaser-section"
    >
      <div className="category-wrapper">
        {Object.entries(categories).map(([variation, label], index) => (
          <SelectorButton
            key={`${variation}_${index}`}
            onClick={() => (window.location.href = `/?variation=${variation}`)}
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
  );
};

export default TeaserSection;
