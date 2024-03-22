import lightIcon from "../assets/SecurBank-icon-light.svg";
import darkIcon from "../assets/SecurBank-icon-dark.svg";
import "./Logo.scss";

/**
 * @param {string} variant - "light" or "dark"
 */
const Logo = ({ variant }) => {
  const icon = variant === "dark" ? darkIcon : lightIcon;
  return (
    <a href="/" className="hover-effect logo-wrapper">
      <img src={icon} alt="SecurBank icon" className="icon" />
      <h5 className={`color-${variant}`}>SecurBank</h5>
    </a>
  );
};

export default Logo;
