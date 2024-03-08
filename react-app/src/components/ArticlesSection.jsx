import React, { useMemo } from "react";
import ArticleCard from "./ArticleCard";
import "./ArticlesSection.scss";

const ArticlesSection = ({ title, cfs, columns = 2 }) => {
  const articles = useMemo(
    () =>
      cfs.map((cf, index) => (
        <ArticleCard key={`${cf.slug}_${index}`} cf={cf} />
      )),
    [cfs]
  );

  return (
    <div className="background-grey">
      <section className="container articles-wrapper">
        {title && <h3 className="color-dark">{title}</h3>}
        <div className={`cards-wrapper columns-${columns}`}>{articles}</div>
      </section>
    </div>
  );
};

export default ArticlesSection;
