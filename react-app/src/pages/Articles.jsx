import React, { useMemo } from "react";
import ArticlesSection from "../components/ArticlesSection";
import CallToActionSection from "../components/CallToActionSection";
import { useArticles } from "../api/usePersistedQueries";

const Articles = () => {
  const { data } = useArticles();

  const articles = useMemo(
    () => (data ? data.map((node) => Object.values(node)[0]) : null),
    [data]
  );

  if (!articles) return;

  return (
    <>
      <ArticlesSection title="Articles" cfs={articles} />
      <CallToActionSection />
    </>
  );
};

export default Articles;
