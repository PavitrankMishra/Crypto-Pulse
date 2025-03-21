import React from "react";
import styles from "./Navbar.module.css";
import { Link } from "react-router-dom";
// import DarkMode from "./DarkMode";

const Navbar = () => {
  return (
    <header className={styles.navbarContainer}>
      <h1 className={styles.navbarLeft}>
        <span>CRYPTO</span> PULSE
      </h1>
      <div className={styles.navbarRight}>
        <h3>
          <Link to="/assets">Assets</Link>
        </h3>
        <h3>
          <Link to="/exchanges">Exchanges</Link>
        </h3>
        <h3>
          <Link to="/livemarket">Live Market</Link>
        </h3>
        <h3>
          <Link to="/historicdata">Historic Data</Link>
        </h3>
      </div>
      {/* <DarkMode /> */}
    </header>
  );
};

export default Navbar;
