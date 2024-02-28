import React, { useMemo } from "react";
import Loading from "../components/Loading";
import CallToActionSection from "../components/CallToActionSection";
import ServicesSection from "../components/ServicesSection";
import { useServices } from "../api/usePersistedQueries";

const Services = () => {
  const { data } = useServices();

  const services = useMemo(
    () => (data ? data.map((node) => Object.values(node)[0]) : null),
    [data]
  );

  if (!services) return <Loading />;

  return (
    <>
      <ServicesSection cfs={services} />
      <CallToActionSection />
    </>
  );
};

export default Services;
