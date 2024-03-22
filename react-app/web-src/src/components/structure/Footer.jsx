import React, { useMemo } from "react";
import Logo from "../Logo";
import copyright from "../../assets/copyright.svg";
import linkedinIcon from "../../assets/linkedin-icon.svg";
import twitterIcon from "../../assets/twitter-icon.svg";
import facebookIcon from "../../assets/facebook-icon.svg";
import { useArticles, useServices } from "../../api";
import "./Footer.scss";

const hardcodedCategories = {
  About: [
    {
      label: "Comparny",
      href: "/",
    },
    {
      label: "Careers",
      href: "/",
    },
    {
      label: "FAQ",
      href: "/",
    },
    {
      label: "Contact Us",
      href: "/",
    },
  ],
};

const Footer = () => {
  const { data: articlesData } = useArticles(3);
  const { data: servicesData } = useServices(3);

  const categories = useMemo(() => {
    const map = {};

    if (articlesData && servicesData) {
      const articles = articlesData.map((node) => ({
        label: node.node.title,
        href: `/articles/${node.node.slug}`,
      }));
      const services = servicesData.map((node) => ({
        label: node.node.title,
        href: `/services/${node.node.slug}`,
      }));

      map["Articles"] = articles;
      map["Services"] = services;
    }

    return { ...map, ...hardcodedCategories };
  }, [articlesData, servicesData]);

  return (
    <footer>
      <div className="container footer">
        <div className="top-wrapper">
          <Logo variant="dark" />
          <div className="categories-wrapper">
            {Object.keys(categories).map((category, index) => (
              <div key={`${category}_${index}`} className="category-wrapper">
                <p className="font-size-large font-weight-medium">{category}</p>
                <nav>
                  {categories[category].map(({ label, href }, index) => (
                    <a
                      key={`${href}_${index}`}
                      href={href}
                      className="font-size-large font-weight-medium color-dark"
                    >
                      {label}
                    </a>
                  ))}
                </nav>
              </div>
            ))}
          </div>
        </div>
        <div className="bottom-wrapper">
          <div className="rights-wrapper">
            <img src={copyright} alt="Copyright icon" className="icon" />
            <p className="font-size-large font-weight-regular">
              2024 SecurBank. All right reserved
            </p>
          </div>
          <div className="social-media-wrapper">
            <a href="/">
              <img src={linkedinIcon} alt="LinkedIn icon" className="icon" />
            </a>
            <a href="/">
              <img src={twitterIcon} alt="Twitter icon" className="icon" />
            </a>
            <a href="/">
              <img src={facebookIcon} alt="Facebook icon" className="icon" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
