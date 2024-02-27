import React from "react";
import ArticleCard from "./ArticleCard";
import "./ArticlesSection.scss";

const ArticlesSection = ({ title, cfs, columns = 2 }) => {
  return (
    <div className="background-grey">
      <section className="container articles-wrapper">
        {title && <h3 className="color-dark">{title}</h3>}
        <div className={`cards-wrapper columns-${columns}`}>
          {cfs.map((cf) => (
            <ArticleCard key={cf.slug} cf={cf} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default ArticlesSection;
