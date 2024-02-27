import React from "react";
import Logo from "../Logo";
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
                key={index}
                href={href}
                className="font-size-medium font-weight-medium color-light"
              >
                {label}
              </a>
            ))}
          </nav>
        </div>
        <div className="buttons-wrapper">
          <button className="transparent font-size-medium">Sign In</button>
          <button className="font-size-medium">Open an Account</button>
        </div>
      </div>
    </header>
  );
};

export default Header;
