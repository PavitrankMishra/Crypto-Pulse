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
  const [financeImage, setFinanceImage] = useState([]);

  const fetchFinanceImage = async () => {
    const apiKey = "vKVdbtgq3J7RcaVRKMIHrnLFJC8txUAWQN0uQEasjMC11ZeqPspJGO9f"; // Replace with your actual API key
    const response = await fetch(
      "https://api.pexels.com/v1/search?query=finance&per_page=10",
      {
        headers: {
          Authorization: apiKey,
        },
      }
    );

    if (!response.ok) throw new Error("Failed to fetch image");

    const data = await response.json();
    // console.log(data.photos);
    setFinanceImage(data.photos.map((photo) => photo.src.medium));
  };

  useEffect(() => {
    fetchFinanceImage();
  }, []);
  const fetchExchanges = async () => {
    // const apiKey = "vKVdbtgq3J7RcaVRKMIHrnLFJC8txUAWQN0uQEasjMC11ZeqPspJGO9f";

    try {
      setLoading(true);
      const response = await fetch("https://api.coincap.io/v2/exchanges");
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
      const data = await response.json();
      setAllExchanges(data.data);
      setDisplayedExchanges(data.data.slice(0, itemsPerPage));
      // console.log(data.data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExchanges();
  }, []);

  const mergedExchanges = allExchanges.map((exchange, index) => ({
    ...exchange,
    imageUrl: financeImage[index],
  }));

  useEffect(() => {
    if (allExchanges.length > 0 && financeImage.length > 0) {
      const mergedData = allExchanges.map((exchange, index) => ({
        ...exchange,
        imageUrl: financeImage[index], // Default if no image available
      }));
      setDisplayedExchanges(mergedData.slice(0, itemsPerPage));
    }
  }, [allExchanges, financeImage]);

  const loadMore = () => {
    const nextPage = page + 1;
    const newExchanges = allExchanges
      .slice(0, nextPage * itemsPerPage)
      .map((exchange, index) => ({
        ...exchange,
        imageUrl: financeImage[index],
      }));

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
                <div className={styles.imageContainer}>
                  <img src={exchange.imageUrl} alt={exchange.name} />
                </div>
                <div className={styles.rankContainer}>
                  <p>
                    <strong>{exchange.rank}</strong>
                  </p>
                </div>
                <div className={styles.nameContainer}>
                  <h2>
                    {exchange.name}
                  </h2>
                </div>

                <div className={styles.totalVolumeContainer}>
                  <h2>
                    <strong>
                      Market Share:{" "}
                      {parseFloat(exchange.percentTotalVolume).toFixed(2)}
                    </strong>
                  </h2>
                </div>
                <div className={styles.volumeContainer}>
                  <p>
                    <strong>Trading Volume: </strong>
                    {parseFloat(exchange.volumeUsd) >= 1e9
                      ? (parseFloat(exchange.volumeUsd) / 1e9).toFixed(2) + "B"
                      : parseFloat(exchange.volumeUsd) >= 1e6
                      ? (parseFloat(exchange.volumeUsd) / 1e6).toFixed(2) + "M"
                      : parseFloat(exchange.volumeUsd).toFixed(2)}
                  </p>
                </div>
                <div className={styles.pairContainer}>
                  <p>
                    <strong>Trading Pairs: </strong>
                    {exchange.tradingPairs}{" "}
                  </p>
                </div>
                <div className={styles.socketSupportContainer}>
                  <p>
                    <strong>Web Socket Support:</strong>
                    {exchange.socket ? (
                      <span className={styles.true}>True</span>
                    ) : (
                      <span className={styles.false}>False</span>
                    )}
                  </p>
                </div>
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
