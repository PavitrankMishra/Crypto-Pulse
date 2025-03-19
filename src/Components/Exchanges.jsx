import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import styles from "./Exchanges.module.css";

const Exchanges = () => {
  const [allExchanges, setAllExchanges] = useState([]);
  const [displayedExchanges, setDisplayedExchanges] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const itemsPerPage = 10;

  const fetchExchanges = async () => {
    try {
      setLoading(true);
      const response = await fetch("https://api.coincap.io/v2/exchanges");
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
      const data = await response.json();
      setAllExchanges(data.data);
      setDisplayedExchanges(data.data.slice(0, itemsPerPage));
      console.log(data.data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExchanges();
  }, []);

  const loadMore = () => {
    const nextPage = page + 1;
    const newExchanges = allExchanges.slice(0, nextPage * itemsPerPage);
    setDisplayedExchanges(newExchanges);
    setPage(nextPage);
  };
  return (
    <div>
      <Navbar />
      {loading && <p>Loading...</p>}

      {error && <p>Error: {error.message}</p>}

      {!loading && !error && displayedExchanges.length > 0 && (
        <>
          {displayedExchanges.map((exchange) => (
            <div className={styles.exchangeCard} key={exchange.exchangeId}>
              <h2>
                <strong>Name: </strong>
                <p>{exchange.name}</p>
              </h2>
              <p>
                <strong>Rank: {exchange.rank}</strong>
              </p>
              <h2>
                <strong>Market Share: {exchange.percentTotalVolume}</strong>
              </h2>
              <p>
                <strong>Trading Volume:</strong>
                {exchange.volumeUsd}{" "}
              </p>
              <p>
                <strong>Trading Pairs: </strong>
                {exchange.tradingPairs}{" "}
              </p>
              <p>
                <strong>Web Socket Support</strong>
                {exchange.socket ? <span>True</span> : <span>False</span>}
              </p>
            </div>
          ))}

          {displayedExchanges.length < allExchanges.length && (
            <button onClick={loadMore}>Load More</button>
          )}
        </>
      )}
    </div>
  );
};

export default Exchanges;
