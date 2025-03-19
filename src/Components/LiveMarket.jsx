import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";

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

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>Error: {error.message}</p>}

      {!loading && !error && rates.length > 0 && (
        <>
          {rates.map((rate, index) => (
            <div
              key={`${rate.id} - ${index}`}
              style={{
                border: "1px solid #ccc",
                padding: "10px",
                margin: "5px",
              }}
            >
              <p>
                <strong>ID:</strong> {rate.id}
              </p>
              <p>
                <strong>Symbol:</strong> {rate.currencySymbol || "N/A"}
              </p>
              <p>
                <strong>Rate (USD):</strong> {rate.rateUsd}
              </p>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default LiveMarket;
