import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import styles from "./Exchanges.module.css";
import Loading from "./Loading";

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
      {loading && <Loading />}

      {error && <p>Error: {error.message}</p>}

      {!loading && !error && displayedExchanges.length > 0 && (
        <>
          <div className={styles.exchangesContainer}>
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
                  <strong>
                    Market Share:{" "}
                    {parseFloat(exchange.percentTotalVolume).toFixed(2)}
                  </strong>
                </h2>
                <p>
                  <strong>Trading Volume: </strong>
                  {parseFloat(exchange.volumeUsd) >= 1e9
                    ? (parseFloat(exchange.volumeUsd) / 1e9).toFixed(2) + "B"
                    : parseFloat(exchange.volumeUsd) >= 1e6
                    ? (parseFloat(exchange.volumeUsd) / 1e6).toFixed(2) + "M"
                    : parseFloat(exchange.volumeUsd).toFixed(2)}
                </p>
                <p>
                  <strong>Trading Pairs: </strong>
                  {exchange.tradingPairs}{" "}
                </p>
                <p>
                  <strong>Web Socket Support:</strong>
                  {exchange.socket ? (
                    <span className={styles.true}>True</span>
                  ) : (
                    <span className={styles.false}>False</span>
                  )}
                </p>
              </div>
            ))}
          </div>
          <div className={styles.loadMore}>
            {displayedExchanges.length < allExchanges.length && (
              <button className={styles.loadMoreBtn} onClick={loadMore}>
                Load More
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Exchanges;
