import React, { useMemo } from "react";
import CallToActionSection from "../components/CallToActionSection";
import ServicesSection from "../components/ServicesSection";
import { useServices } from "../api/usePersistedQueries";
import ServiceDetail from "../components/ServiceDetail";

const Services = () => {
  const { data } = useServices();

  const services = useMemo(
    () => (data ? data.map((node) => Object.values(node)[0]) : null),
    [data]
  );

  if (!services) return;

  return (
    <>
      <ServiceDetail />
      <ServicesSection cfs={services} />
      <CallToActionSection />
    </>
  );
};

export default Services;
