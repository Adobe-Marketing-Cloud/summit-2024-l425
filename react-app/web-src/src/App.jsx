import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Helmet, HelmetProvider } from "react-helmet-async";
import Footer from "./components/structure/Footer.jsx";
import Header from "./components/structure/Header.jsx";
import Home from "./pages/Home.jsx";
import Articles from "./pages/Articles.jsx";
import Services from "./pages/Services.jsx";
import ArticleDetail from "./pages/ArticleDetail.jsx";
import NotFound from "./pages/NotFound.jsx";
import { getURI } from "./utils";
import "./App.scss";
import {getServiceURL} from "./utils/getURI";

function App() {
  return (
    <HelmetProvider>
      <div className="app">
        <Helmet>
          <script
            src="https://universal-editor-service.adobe.io/cors.js"
            async
          />
          <meta
            name="urn:adobe:aue:system:aemconnection"
            content={`aem:${getURI()}`}
          />
          { getServiceURL() && <meta name="urn:adobe:aue:config:service" content={getServiceURL()}/> }
          <script type="application/vnd.adobe.aue.component+json" src="./static/component-definition.json"></script>
          <script type="application/vnd.adobe.aue.model+json" src="./static/filter-definition.json"></script>
        </Helmet>
        <Router>
          <Header />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/articles" element={<Articles />} />
              <Route path="/articles/:slug" element={<ArticleDetail />} />
              <Route path="/services" element={<Services />} />
              <Route path="/services/:slug" element={<Services />} />
              <Route path="/*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
        </Router>
      </div>
    </HelmetProvider>
  );
}

export default App;
