import React from "react";
import Logo from "../Logo";
import RedirectButton from "../RedirectButton";
import "./Header.scss";

const Header = () => {
  const navigations = [
    { label: "Services", href: "/services" },
    { label: "Articles", href: "/articles" },
  ];

  return (
    <header className="background-blue">
      <div className="container header">
        <div className="navigations-wrapper">
          <Logo variant="light" />
          <nav>
            {navigations.map(({ label, href }, index) => (
              <a
                key={`${href}_${index}`}
                href={href}
                className="font-size-medium font-weight-medium color-light hover-effect"
              >
                {label}
              </a>
            ))}
          </nav>
        </div>
        <div className="buttons-wrapper">
          <RedirectButton className="transparent font-size-medium hover-effect">
            Sign In
          </RedirectButton>
          <RedirectButton className="font-size-medium hover-effect">
            Open an Account
          </RedirectButton>
        </div>
      </div>
    </header>
  );
};

export default Header;
