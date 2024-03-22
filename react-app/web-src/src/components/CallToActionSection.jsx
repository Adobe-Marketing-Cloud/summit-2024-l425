import React from "react";
import RedirectButton from "./RedirectButton";
import "./CallToActionSection.scss";

const CallToActionSection = () => {
  return (
    <section className="container cta-wrapper">
      <div className="content-button-wrapper background-blue card-wrapper">
        <div className="content-wrapper">
          <h1 className="color-light">
            Unlock Your Financial Future with SecurBank
          </h1>
          <p className="color-grey">
            Experience effortless banking with SecurBank. Start your journey to
            financial freedom.
          </p>
        </div>
        <div className="buttons-wrapper">
          <RedirectButton className="hover-effect">
            Open an Account
          </RedirectButton>
          <RedirectButton className="secondary hover-effect">
            Contact Us
          </RedirectButton>
        </div>
      </div>
    </section>
  );
};

export default CallToActionSection;
