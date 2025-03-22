import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Navbar from "./Navbar";
import ChartComponent from "./ChartComponent";
import Loading from "./Loading";
import styles from "./HistoricalData.module.css";
import Footer from "./Footer";

const HistoricalData = () => {
  const [marketData, setMarketData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchMarketData = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        "https://api.coingecko.com/api/v3/coins/ethereum/ohlc?vs_currency=btc&days=7"
      );

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const data = await response.json();
      console.log("Fetched Data:", data);
      setMarketData(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMarketData();
  }, []);

  // Define animation variants for the rows
  const rowVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (index) => ({
      opacity: 1,
      y: 0,
      transition: { delay: index * 0.1, duration: 0.5 },
    }),
  };

  return (
    <>
      <div className={styles.container}>
        <Navbar />
        <div className={styles.headingContainer}>
          <h2>Cryptocurrency OHLC Data (Last 7 Days)</h2>
        </div>
        <ChartComponent marketData={marketData} />

        {loading && <Loading />}
        {error && <p className="error">Error: {error}</p>}

        {!loading && !error && marketData.length > 0 && (
          <table>
            <thead>
              <tr>
                <th>Timestamp</th>
                <th>Open</th>
                <th>High</th>
                <th>Low</th>
                <th>Close</th>
              </tr>
            </thead>
            <tbody>
              {marketData.map(([timestamp, open, high, low, close], index) => (
                <motion.tr
                  key={timestamp}
                  custom={index}
                  variants={rowVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <td>{new Date(timestamp).toLocaleDateString()}</td>
                  <td>{open.toFixed(6)}</td>
                  <td className={styles.high}>{high.toFixed(6)}</td>
                  <td className={styles.low}>{low.toFixed(6)}</td>
                  <td>{close.toFixed(6)}</td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      <Footer />
    </>
  );
};

export default HistoricalData;
