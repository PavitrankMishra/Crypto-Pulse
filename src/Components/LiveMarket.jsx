import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import styles from "./LiveMarket.module.css";
import Loading from "./Loading";

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
      console.log(data.data);
      setRates(data.data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRates();
  }, []);

  return (
    <div>
      <Navbar />

      {loading && <Loading />}
      {error && <p style={{ color: "red" }}>Error: {error.message}</p>}

      {!loading && !error && rates.length > 0 && (
        <>
          <div className={styles.ratesContainer}>
            {rates.map((rate, index) => (
              <div className={styles.rateCard} key={`${rate.id} - ${index}`}>
                <p>
                  <strong>ID:</strong> {rate.id}
                </p>
                <p>
                  <strong>Symbol:</strong> {rate.currencySymbol || "N/A"}
                </p>
                <p>
                  <strong>Rate (USD):</strong>{" "}
                  {parseFloat(rate.rateUsd).toFixed(2)}
                </p>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default LiveMarket;
