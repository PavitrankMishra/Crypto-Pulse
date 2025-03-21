import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import ChartComponent from "./ChartComponent";
import Loading from "./Loading";
import "./HistoricalData.css"; // Import CSS

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

  return (
    <div className="container">
      <Navbar />
      <h2>Ethereum OHLC Data (Last 7 Days)</h2>
      <ChartComponent marketData={marketData} />

      {loading && <p className="loading">Loading data...</p>}
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
            {marketData.map(([timestamp, open, high, low, close]) => (
              <tr key={timestamp}>
                <td>{new Date(timestamp).toLocaleDateString()}</td>
                <td>{open.toFixed(6)}</td>
                <td>{high.toFixed(6)}</td>
                <td>{low.toFixed(6)}</td>
                <td>{close.toFixed(6)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default HistoricalData;
