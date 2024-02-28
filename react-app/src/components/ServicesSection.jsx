import React, { useState, useMemo } from "react";
import ServiceCard from "./ServiceCard";
import "./ServicesSection.scss";

const ServicesSection = ({ slug, cfs }) => {
  const [selectedCategory, setSelectedCategory] = useState("All Services");

  const categoriesedServices = useMemo(() => {
    const map = {};
    cfs.forEach((service) => {
      const category = service?.serviceCategory?.name;
      if (category) {
        map[category] = map[category] || [];
        if (service.slug !== slug) {
          map[category].push(service);
        } else {
          setSelectedCategory(category);
        }
      }
    });
    return { "All Services": cfs, ...map };
  }, [slug, cfs]);

  const services = useMemo(
    () =>
      categoriesedServices[selectedCategory].map((service) => (
        <ServiceCard key={service.slug} cf={service} />
      )),
    [selectedCategory, categoriesedServices]
  );

  return (
    <div className="background-grey">
      <section className="container services-wrapper">
        <div className="category-wrapper">
          {Object.keys(categoriesedServices).map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`font-size-medium${
                selectedCategory === category ? " selected" : ""
              }`}
            >
              {category}
            </button>
          ))}
        </div>
        {services}
      </section>
    </div>
  );
};

export default ServicesSection;
