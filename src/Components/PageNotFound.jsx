import React from "react";
import styles from "./PageNotFound.module.css";
import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <div className={styles.notfoundContainer}>
      <h2>404 - Page NotFound</h2>
      <p>OOps! The page you are looking for doesn't exist</p>
      <Link to="/">Go Back Home</Link>
    </div>
  );
};

export default PageNotFound;
