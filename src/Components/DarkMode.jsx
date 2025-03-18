import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faMoon } from "@fortawesome/free-solid-svg-icons";
import styles from "./DarkMode.module.css";

const DarkMode = () => {
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("darkmode");
      localStorage.setItem("theme", "dark");
    } else {
      document.body.classList.remove("darkmode");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  const toggleTheme = () => {
    setDarkMode((prevMode) => !prevMode);
  };

  return (
    <div className={styles.darkmode}>
      <input
        className={styles.darkmode_input}
        type="checkbox"
        id="darkmode_toggle"
        checked={darkMode}
        onChange={toggleTheme}
      />
      <label className={styles.darkmode_label} htmlFor="darkmode_toggle">
        <FontAwesomeIcon icon={faSun} className={styles.darkmode_label_sun} />
        <FontAwesomeIcon icon={faMoon} className={styles.darkmode_label_moon} />
      </label>
    </div>
  );
};

export default DarkMode;
