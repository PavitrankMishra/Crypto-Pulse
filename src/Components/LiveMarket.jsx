import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import Loading from "./Loading";
import styles from "./LiveMarket.module.css";

const LiveMarket = () => {
  const [rates, setRates] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchRates = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch("https://api.coincap.io/v2/rates");
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const data = await response.json();
      setRates(data.data);
      console.log(data.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRates();
  }, []);

  return (
    <div className={styles.liveMarketContainer}>
      <Navbar />
      <div className={styles.content}>
        <h2 className="title">Live Market Rates</h2>

        {loading && <Loading />}
        {error && <p className={styles.errorText}>Error: {error}</p>}

        {!loading && !error && rates.length > 0 && (
          <div className={styles.gridContainer}>
            {rates.map((rate, index) => (
              <div key={`${rate.id}-${index}`} className={styles.rateCard}>
                <p className={styles.rateId}>{rate.id.toUpperCase()}</p>
                <p className={styles.rateSymbol}>
                  <strong>Symbol:</strong> {rate.currencySymbol || "N/A"}
                </p>
                <p className={styles.rateValue}>
                  <strong>Rate (USD):</strong> $
                  {parseFloat(rate.rateUsd).toFixed(2)}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default LiveMarket;
