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
      <div className={styles.liveMarketContent}>
        <h2 className={styles.title}>Live Market Rates</h2>

        {loading && <Loading />}
        {error && <p className={styles.errorText}>Error: {error}</p>}

        {!loading && !error && rates.length > 0 && (
          <div className={styles.tableWrapper}>
            <table className={styles.marketTable}>
              <thead>
                <tr>
                  <th>#</th>
                  <th>ID</th>
                  <th>Symbol</th>
                  <th>Rate (USD)</th>
                </tr>
              </thead>
              <tbody>
                {rates.slice(0, 20).map((rate, index) => (
                  <tr
                    key={rate.id}
                    className={styles.tableRow}
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <td>{index + 1}</td>
                    <td>{rate.id.toUpperCase()}</td>
                    <td>{rate.currencySymbol || "N/A"}</td>
                    <td>${parseFloat(rate.rateUsd).toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default LiveMarket;
