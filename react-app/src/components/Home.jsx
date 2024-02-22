import React from "react";

import { usePageBySlug } from "../api/usePersistedQueries";
import TeaserList from "./TeaserList";
import ParallaxTeaser from "./ParallaxTeaser";
import Loading from "./Loading";

const Home = () => {
  const { page } = usePageBySlug("home");

  if (!page) return <Loading />;

  return (
    <>
      <ParallaxTeaser cf={page} />
      <TeaserList cf={page.teasers} />
    </>
  );
};

export default Home;
