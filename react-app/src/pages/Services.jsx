import React, { useMemo } from "react";
import { useParams } from "react-router-dom";
import ServiceDetail from "../components/ServiceDetail";
import ServicesSection from "../components/ServicesSection";
import CallToActionSection from "../components/CallToActionSection";
import { useServices } from "../api";

const Services = () => {
  const { slug } = useParams();
  const { data } = useServices();

  const services = useMemo(
    () => (data ? data.map((node) => Object.values(node)[0]) : null),
    [data]
  );

  if (!services) return;

  return (
    <>
      <ServiceDetail slug={slug} />
      <ServicesSection slug={slug} cfs={services} />
      <CallToActionSection />
    </>
  );
};

export default Services;
