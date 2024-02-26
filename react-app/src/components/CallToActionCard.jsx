import React from "react";
import "./CallToActionCard.scss";

const CallToActionCard = () => {
  return (
    <div className="cta-wrapper">
      <div className="content-button-wrapper background-blue card-wrapper">
        <div className="content-wrapper">
          <h1 className="color-light">
            Unlock Your Financial Future with SecurBank
          </h1>
          <p>
            Experience effortless banking with SecurBank. Start your journey to
            financial freedom.
          </p>
        </div>
        <div className="buttons-wrapper">
          <button>Open an Account</button>
          <button className="secondary">Contact Us</button>
        </div>
      </div>
    </div>
  );
};

export default CallToActionCard;
