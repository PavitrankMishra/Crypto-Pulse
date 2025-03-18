import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";

const Exchanges = () => {
  const [exchanges, setExchanges] = useState([]);
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(null);

  const fetchExchanges = async () => {
    try {
      const response = await fetch("https://api.coincap.io/v2/exchanges");
      const data = await response.json();
      console.log(data.data);
      setLoading(false);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExchanges();
  }, []);
  return (
    <div>
      <Navbar />
      <h1>Cryptocurrency Exchanges</h1>
    </div>
  );
};

export default Exchanges;
