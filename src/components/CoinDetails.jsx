import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { LineChart } from "./LineChart";
import "./CoinDetails.css";
export function CoinDetails() {
  const { id } = useParams();
  const [coinDetails, setCoinDetails] = useState(null);
  const [historicalData, setHistoricalData] = useState();
  const loadDetails = async () => {
    const response = await axios.get(
      `https://api.coingecko.com/api/v3/coins/${id}`
    );
    setCoinDetails(response.data);
  };
  const loadHistoricalData = async () => {
    const response = await axios.get(
      `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=10&interval=daily`
    );
    setHistoricalData(response.data);
  };
  useEffect(() => {
    loadDetails();
    loadHistoricalData();
  }, []);
  return (
    <>
      <Header />
      <div className="coin-details-container">
        {coinDetails ? (
          <div className="coin-details">
            <img src={coinDetails.image.large} />
            <h1>
              {coinDetails.name} ({coinDetails.symbol.toUpperCase()})
            </h1>
            {historicalData && <LineChart historicalData={historicalData} />}
          </div>
        ) : (
          <div className="loading"></div>
        )}
      </div>
      <Footer />
    </>
  );
}
