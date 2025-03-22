import React from "react";
import styles from "./Footer.module.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLinkedinIn,
  faSquareGithub,
} from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
  return (
    <div className={styles.footerContainer}>
      {/* Left Section */}
      <div className={styles.footerLeft}>
        <h1 className={styles.footerLogo}>
          <span>CRYPTO</span> PULSE
        </h1>
        <p>Your Trusted Source </p>
        <p>for the Latest in Crypto.</p>
      </div>

      {/* Middle Navigation */}
      <div className={styles.footerMiddle}>
        <Link to="/">Home</Link>
        <Link to="/assets">Assets</Link>
        <Link to="/exchanges">Exchanges</Link>
        <Link to="/livemarket">Live Market</Link>
        <Link to="/historicdata">Historical Data</Link>
      </div>

      {/* Right Section with Social Icons */}
      <div className={styles.footerRight}>
        <div className={styles.socialIcons}>
          <a
            href="https://www.linkedin.com/in/pavitrank-mishra/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon icon={faLinkedinIn} className={styles.linkedin} />
          </a>
          <a
            href="https://github.com/PavitrankMishra"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon icon={faSquareGithub} className={styles.github} />
          </a>
        </div>
      </div>

      <div className={styles.newsletter}>
        <input type="email" placeholder="Enter your email" />
        <button>Subscribe</button>
      </div>

      <div className={styles.copyright}>
        <p>© {new Date().getFullYear()} Crypto Pulse. All rights reserved.</p>
      </div>
    </div>
  );
};

export default Footer;
