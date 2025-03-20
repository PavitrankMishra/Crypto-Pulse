// import React, { useEffect, useState } from "react";

import Navbar from "./Navbar";
import styles from "./Home.module.css";
import bitcoin from "../assets/bitcoin2.png";
// import { use } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "./Loading";

const Home = () => {
  const navigate = useNavigate();
  // const [cryptoData, setCryptoData] = useState([]);

  // const fetchData = async () => {
  //   try {
  //     const res = await fetch("https://api.coincap.io/v2/rates/bitcoin");
  //     const data = await res.json();
  //     console.log(data);
  //     setCryptoData(data.data);
  //     console.log("Fetching Data");
  //   } catch (error) {
  //     console.log("Error fetching data: " + error);
  //   }
  // };

  // useEffect(() => {
  //   fetchData();
  // }, []);

  return (
    <>
      <div className={styles.homepageContainer}>
        <Navbar />
        <div className={styles.content}>
          <div className={styles.left}>
            <h1>Your Ultimate Crypto Tracker 🚀</h1>
            <p className={styles.subtext}>
              Track live prices, market trends, and historical data in
              real-time.
            </p>
            <button
              className={styles.getStarted}
              onClick={() => navigate("/assets")}
            >
              Get Started
            </button>
          </div>
          <div className={styles.right}>
            <img
              src={bitcoin}
              alt="Crypto Tracker"
              className={styles.cryptoImage}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
