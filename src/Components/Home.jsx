// import React, { useEffect, useState } from "react";

import Navbar from "./Navbar";

const Home = () => {
  // const [cryptoData, setCryptoData] = useState([]);

  // const fetchData = async () => {
  //   try {
  //     const res = await fetch("https://api.coincap.io/v2/rates/bitcoin");
  //     const data = await res.json();
  //     console.log(data);
  //     setCryptoData(data.data);
  //     console.log("Fetching Data");
  //   } catch (error) {
  //     console.log("Error fetching data: " + error);
  //   }
  // };

  // useEffect(() => {
  //   fetchData();
  // }, []);

  return (
    <>
      <Navbar />
    </>
  );
};

export default Home;
