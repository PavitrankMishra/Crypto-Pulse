import React from "react";
import Navbar from "./Navbar";
import { useState, useEffect } from "react";

const Rates = () => {
  const [rates, setRates] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchRates = async () => {
    try {
      setLoading(true);
      const response = await fetch("https://api.coincap.io/v2/rates");
      console.log(response);
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
      const data = await response.json();
      setRates(data.data.slice(0, 10));
      setLoading(false);
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
      <p>This is the rates component</p>
    </div>
  );
};

export default Rates;
