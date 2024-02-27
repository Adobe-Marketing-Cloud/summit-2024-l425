import React from "react";
import ArticleCard from "./ArticleCard";
import "./ArticlesSection.scss";

const ArticlesSection = ({ title, cfs }) => {
  return (
    <div className="background-grey">
      <section className="container articles-wrapper">
        {title && <h3 className="color-dark">{title}</h3>}
        <div className="cards-wrapper">
          {cfs.map((cf) => (
            <ArticleCard key={cf.slug} cf={cf} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default ArticlesSection;
