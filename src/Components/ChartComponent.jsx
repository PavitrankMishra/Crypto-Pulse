import React from "react";
import {
  Chart as ChartJS,
  TimeScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import { Chart } from "react-chartjs-2";
import "chartjs-adapter-date-fns";
import {
  CandlestickController,
  CandlestickElement,
} from "chartjs-chart-financial";

// Register required components
ChartJS.register(
  TimeScale,
  LinearScale,
  CandlestickController,
  CandlestickElement,
  Tooltip,
  Legend
);

const ChartComponent = ({ marketData }) => {
  if (!marketData || marketData.length === 0) {
    return <p>Loading Data...</p>;
  }

  const formattedData = marketData.map(([timestamp, o, h, l, c]) => ({
    x: timestamp,
    o,
    h,
    l,
    c,
  }));

  const data = {
    datasets: [
      {
        label: "Stock Price",
        data: formattedData,
        borderColor: "blue",
        backgroundColor: "rgba(0, 0, 255, 0.1)",
      },
    ],
  };

  const options = {
    responsive: true,
    scales: {
      x: {
        type: "time",
        time: {
          unit: "day",
        },
        title: {
          display: true,
          text: "Date",
        },
      },
      y: {
        title: {
          display: true,
          text: "Stock Price",
        },
      },
    },
  };

  return (
    <div style={{ width: "600px", margin: "auto" }}>
      <h2>Candlestick Chart</h2>
      <Chart type="candlestick" data={data} options={options} />
    </div>
  );
};

export default ChartComponent;
