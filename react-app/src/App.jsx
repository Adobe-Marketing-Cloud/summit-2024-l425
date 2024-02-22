import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Helmet, HelmetProvider } from "react-helmet-async";

import { getURI } from "./components/util/Utils.js";
import Home from "./components/Home.jsx";
import Footer from "./components/structure/Footer.jsx";
import Header from "./components/structure/Header.jsx";

import "./App.css";

function App() {
  return (
    <HelmetProvider>
      <div className="app">
        <Helmet>
          <meta
            name="urn:adobe:aue:system:aemconnection"
            content={`aem:${getURI()}`}
          />
        </Helmet>
        <Router>
          <Header />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              {/* Todo:
              <Route path="/articles" element={<Articles />} />
              <Route path="/articles/:slug" element={<ArticleDetail />} />
              <Route path="/services" element={<Services />} />
              <Route path="/services/:slug" element={<ServiceDetail />} />
              Maybe <Route element={<NotFound />} />
              */}
            </Routes>
          </main>
        </Router>
        <Footer />
      </div>
    </HelmetProvider>
  );
}

export default App;
