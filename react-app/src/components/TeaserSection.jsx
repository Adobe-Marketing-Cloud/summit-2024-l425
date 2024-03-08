import React, { useEffect } from "react";
import TeaserCard from "../components/TeaserCard";
import "./TeaserSection.scss";

const TeaserSection = ({ title, cfs }) => {
  useEffect(() => {
    // const contentAddHandler = (event) => {
    //   setTimeout(() => {
    //     setFetchTrigger((state) => !state);
    //   }, 500);
    //   event.stopPropagation();
    // };
    // const contentRemoveHandler = (event) => {
    //   setTimeout(() => {
    //     setFetchTrigger((state) => !state);
    //   }, 500);
    //   event.stopPropagation();
    // };
    // document.body.addEventListener("aue:content-add", contentAddHandler);
    // document.body.addEventListener("aue:content-remove", contentRemoveHandler);
    // return () => {
    //   document.body.removeEventListener("aue:content-add", contentAddHandler);
    //   document.body.removeEventListener(
    //     "aue:content-remove",
    //     contentRemoveHandler
    //   );
    // };
  }, []);

  if (!cfs) return;

  return (
    <section className="container teaser-section">
      <h2 className="color-dark">{title}</h2>
      {cfs.map((teaser, index) => (
        <TeaserCard key={`${teaser?.title}_${index}`} cf={teaser} />
      ))}
    </section>
  );
};

export default TeaserSection;
