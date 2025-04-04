import React from "react";
import Navbar from "./Navbar";
import { useState, useEffect } from "react";
import styles from "./Assets.module.css";
import Loading from "./Loading";
import Footer from "./Footer";
// import bitcoin from "../assets/bitcoin3.png";

const Assets = () => {
  const [assets, setAssets] = useState([]);
  const [originalAssets, setOriginalAssets] = useState([]); 
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [query, setQuery] = useState("");
  const itemsPerPage = 10;

  // Fetching assets data from the api
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
      setOriginalAssets(data.data);
      setLoading(false);
      console.log(data.data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  // Calling the fetchRates function on initial render
  useEffect(() => {
    fetchRates();
  }, []);

  let filteredAssets = assets.filter((coin) =>
    coin.name.toLowerCase().includes(query.toLowerCase())
  );

  const sortingAlphabetically = () => {
    const sortedAssets = [...assets].sort((a, b) =>
      a.name.localeCompare(b.name)
    );
    setAssets(sortedAssets);
    console.log("Button clicked");
    console.log(assets);
  };

  const sortLowToHigh = () => {
    const lowToHigh = [...assets].sort(
      (a, b) => parseFloat(a.priceUsd) - parseFloat(b.priceUsd)
    );
    setAssets(lowToHigh);
    console.log("Price Sorted Low to High");
  };
  const sortHighToLow = () => {
    const pricedSortedAssets = [...assets].sort(
      (a, b) => parseFloat(b.priceUsd) - parseFloat(a.priceUsd)
    );
    setAssets(pricedSortedAssets);
    console.log("Price Sorted high to Low");
  };

  const resetData = () => {
    setAssets(originalAssets);
    console.log("Reset Data clicked");
  };
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = currentPage * itemsPerPage;
  const visibleRates = filteredAssets.slice(startIndex, endIndex);
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
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button onClick={sortingAlphabetically}>Sort Aplhabetically</button>
          <button onClick={resetData}>Reset filters</button>
        </div>
        {loading && <Loading />}

        {error && <p>Error: {error}</p>}

        {!loading && !error && assets.length > 0 && (
          <>
            <table border={1}>
              <thead>
                <tr>
                  <th>Rank</th>
                  <th>Name</th>
                  <th>Symbol</th>
                  <th>
                    Price (USD){" "}
                    <button onClick={sortHighToLow}>
                      <i class="ri-arrow-down-line"></i>
                    </button>
                    <button onClick={sortLowToHigh}>
                      <i class="ri-arrow-up-line"></i>
                    </button>
                  </th>
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
      <Footer />
    </>
  );
};

export default Assets;
