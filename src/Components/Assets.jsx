import React from "react";
import Navbar from "./Navbar";
import { useState, useEffect } from "react";
import styles from "./Assets.module.css";

const Assets = () => {
  const [assets, setAssets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const fetchRates = async () => {
    try {
      setLoading(true);
      const response = await fetch("https://api.coincap.io/v2/assets");
      console.log(response);
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
      const data = await response.json();
      setAssets(data.data);
      setLoading(false);
      console.log(data.data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchRates();
  }, []);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = currentPage * itemsPerPage;
  const visibleRates = assets.slice(startIndex, endIndex);
  return (
    <>
      <Navbar />
      <div className={styles.assetContainer}>
        <h2>Crypto Market Overview</h2>
        <div className={styles.inputContainer}>
          <input
            type="text"
            placeholder="Enter the name of cryptocurrency"
            className={styles.searchInput}
          />
        </div>
        {loading && <p>Loading....</p>}

        {error && <p>Error: {error}</p>}

        {!loading && !error && assets.length > 0 && (
          <>
            <table border={1}>
              <thead>
                <tr>
                  <th>Rank</th>
                  <th>Name</th>
                  <th>Symbol</th>
                  <th>Price (USD)</th>
                  <th>24H Change</th>
                  <th>Market</th>
                </tr>
              </thead>
              <tbody>
                {visibleRates.map((coin) => (
                  <tr key={coin.id}>
                    <td>{coin.rank}</td>
                    <td>{coin.name}</td>
                    <td>{coin.symbol}</td>
                    <td>${parseFloat(coin.priceUsd).toFixed(2)}</td>
                    <td
                      className={`${styles.change} ${
                        parseFloat(coin.changePercent24Hr) < 0
                          ? styles.red
                          : styles.green
                      }`}
                    >
                      {parseFloat(coin.changePercent24Hr).toFixed(2)}%
                    </td>
                    <td>{coin.symbol}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className={styles.pagination}>
              <button
                onClick={() => setCurrentPage((prev) => prev - 1)}
                disabled={currentPage == 1}
              >
                Previous
              </button>
              <button
                onClick={() => setCurrentPage((prev) => prev + 1)}
                disabled={endIndex >= assets.length}
              >
                Next
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Assets;
