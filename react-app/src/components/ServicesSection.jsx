import React, { useState, useMemo, useEffect } from "react";
import { useParams } from "react-router-dom";
import ServiceDetail from "./ServiceDetail";
import ServiceCard from "./ServiceCard";
import "./ServicesSection.scss";

const ServicesSection = ({ cfs }) => {
  const { slug } = useParams();
  const [selectedService, setSelectedService] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("All Services");

  const categoriesedServices = useMemo(() => {
    const map = {};
    cfs.forEach((service) => {
      const category = service?.serviceCategory?.name;
      if (category) {
        map[category] = map[category] || [];
        map[category].push(service);
      }
    });
    return { "All Services": cfs, ...map };
  }, [cfs]);

  const services = useMemo(
    () =>
      categoriesedServices[selectedCategory].map((service) => (
        <ServiceCard key={service.slug} cf={service} />
      )),
    [selectedCategory, categoriesedServices]
  );

  useEffect(() => {
    const handleLocationChange = ({ detail }) => {
      setSelectedService(detail.slug);
    };
    window.addEventListener("updateLocation", handleLocationChange);
    return () => {
      window.removeEventListener("updateLocation", handleLocationChange);
    };
  }, []);

  useEffect(() => {
    setSelectedService(slug);
  }, [slug]);

  return (
    <>
      <ServiceDetail slug={selectedService} />
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
    </>
  );
};

export default ServicesSection;
