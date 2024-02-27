import React from "react";
import Logo from "../Logo";
import copyright from "../../assets/copyright.svg";
import linkedinIcon from "../../assets/linkedin-icon.svg";
import twitterIcon from "../../assets/twitter-icon.svg";
import facebookIcon from "../../assets/facebook-icon.svg";
import "./Footer.scss";

const Footer = () => {
  const categories = {
    Services: [
      {
        label: "Savings Account",
        href: "/",
      },
      {
        label: "Mortgage Consultation",
        href: "/",
      },
      {
        label: "Credit Card Application Assistance",
        href: "/",
      },
    ],
    Magazine: [
      {
        label: "Category 1",
        href: "/",
      },
      {
        label: "Category 2",
        href: "/",
      },
      {
        label: "Category 3",
        href: "/",
      },
    ],
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
  return (
    <footer>
      <div className="container footer">
        <div className="top-wrapper">
          <Logo variant="dark" />
          <div className="categories-wrapper">
            {Object.keys(categories).map((category, index) => (
              <div key={index} className="category-wrapper">
                <p className="font-size-large font-weight-medium">{category}</p>
                <nav>
                  {categories[category].map(({ label, href }, index) => (
                    <a
                      key={index}
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
