import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun } from "@fortawesome/free-solid-svg-icons";
import { faMoon } from "@fortawesome/free-solid-svg-icons";
import styles from "./Darkmode.module.css";

const DarkMode = () => {
  return (
    <div className={styles.darkmode}>
      <input
        className={styles.darkmode_input}
        type="checkbox"
        id="darkmode_toggle"
      />
      <label className={styles.darkmode_label} htmlFor="darkmode_toggle">
        <FontAwesomeIcon icon={faSun} className={styles.darkmode_label_sun} />
        <FontAwesomeIcon icon={faMoon} className={styles.darkmode_label_moon} />
      </label>
    </div>
  );
};

export default DarkMode;
