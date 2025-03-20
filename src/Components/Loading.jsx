import React from "react";
import "remixicon/fonts/remixicon.css";
import styles from "./Loading.module.css";

const Loading = () => {
  return (
    <div className={styles.container}>
      <i className={`ri-loader-2-line ${styles.spinner}`}></i>
      <p>Loading...</p>
    </div>
  );
};

export default Loading;
