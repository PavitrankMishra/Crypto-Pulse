import React from "react";
import styles from "./FeatureSection.module.css";
import bitcoin from "../assets/bitcoin2.png";

const features = [
  { title: "Real-Time Updates", icon: "📈" },
  { title: "Secure & Trusted", icon: "🔐" },
  { title: "Live Market Trends", icon: "📊" },
  { title: "Historical Data", icon: "⏳" },
  { title: "Crypto News", icon: "📰" },
  { title: "24/7 Monitoring", icon: "⏰" },
];

const FeatureSection = () => {
  return (
    <div className={styles.featureSection}>
      <div className={styles.centerImage}>
        <img src={bitcoin} alt="Crypto Pulse"></img>
      </div>

      <div className={styles.featureContainer}>
        {features.map((feature, index) => {
          return (
            <div
              key={index}
              className={`${styles.featureItem} ${
                styles[`feature${index + 1}`]
              }`}
            >
              <span className={styles.icon}>{feature.icon}</span>
              <p className={styles.text}>{feature.title}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FeatureSection;
