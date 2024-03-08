import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import ServiceCard from "./ServiceCard";
import SelectorButton from "./SelectorButton";
import "./ServicesSection.scss";

const ServicesSection = ({ slug, cfs }) => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState("All Services");

  const categoriesedServices = useMemo(() => {
    const map = { "All Services": [] };
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
      if (service.slug !== slug) {
        map["All Services"].push(service);
      }
    });
    return map;
  }, [slug, cfs]);

  const services = useMemo(
    () =>
      categoriesedServices[selectedCategory].map((service, index) => (
        <ServiceCard
          key={`${service.slug}_${index}`}
          cf={service}
          navigate={navigate}
        />
      )),
    [selectedCategory, categoriesedServices, navigate]
  );

  return (
    <div className="background-grey">
      <section className="container services-wrapper">
        <div className="category-wrapper">
          {Object.keys(categoriesedServices).map((category, index) => (
            <SelectorButton
              key={`${category}_${index}`}
              variant="dark"
              onClick={() => setSelectedCategory(category)}
              isSelected={selectedCategory === category}
            >
              {category}
            </SelectorButton>
          ))}
        </div>
        {services}
      </section>
    </div>
  );
};

export default ServicesSection;
