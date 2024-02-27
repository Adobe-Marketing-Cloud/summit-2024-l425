import React from "react";
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
          <button>Open an Account</button>
          <button className="secondary">Contact Us</button>
        </div>
      </div>
    </section>
  );
};

export default CallToActionSection;
