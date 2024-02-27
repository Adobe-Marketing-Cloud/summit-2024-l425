import React, { useMemo } from "react";
import Loading from "../components/Loading";
import { useArticles } from "../api/usePersistedQueries";
import ArticlesSection from "../components/ArticlesSection";
import CallToActionSection from "../components/CallToActionSection";

const Articles = () => {
  const { data } = useArticles();

  const articles = useMemo(
    () => (data ? data.map((node) => Object.values(node)[0]) : null),
    [data]
  );

  if (!articles) return <Loading />;

  return (
    <>
      <ArticlesSection title="Articles" cfs={articles} />
      <CallToActionSection />
    </>
  );
};

export default Articles;
