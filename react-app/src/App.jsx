import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import Footer from "./components/structure/Footer.jsx";
import Header from "./components/structure/Header.jsx";
import Home from "./pages/Home.jsx";
import Articles from "./pages/Articles.jsx";
import Services from "./pages/Services.jsx";
import ArticleDetail from "./pages/ArticleDetail.jsx";
import NotFound from "./pages/NotFound.jsx";
import { getURI } from "./utils";
import "./App.scss";

function App() {
  return (
    <HelmetProvider>
      <div className="app">
        <Header />
        <Router>
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
        </Router>
        <Footer />
      </div>
    </HelmetProvider>
  );
}

export default App;
