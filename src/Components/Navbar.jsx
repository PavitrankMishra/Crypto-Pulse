import React from "react";
import styles from "./Navbar.module.css";
import DarkMode from "./DarkMode";

const Navbar = () => {
  return (
    <header className={styles.container}>
      <h1 className={styles.left}>Crypto Pulse</h1>
      <div className={styles.right}>
        <h3>Home</h3>
        <h3>About</h3>
        <h3>Contact Us</h3>
        <h3>More</h3>
      </div>
      <DarkMode />
    </header>
  );
};

export default Navbar;
