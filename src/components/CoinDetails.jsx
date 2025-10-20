import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { LineChart } from "./LineChart";
import "./CoinDetails.css";
export function CoinDetails({ currency }) {
  const { id } = useParams();
  const [coinDetails, setCoinDetails] = useState(null);
  const [historicalData, setHistoricalData] = useState();
  useEffect(() => {
    const loadDetails = async () => {
      const response = await axios.get(
        `https://api.coingecko.com/api/v3/coins/${id}`
      );
      setCoinDetails(response.data);
      console.log(response.data);
    };
    const loadHistoricalData = async () => {
      const response = await axios.get(
        `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=${currency}&days=10&interval=daily`
      );
      setHistoricalData(response.data);
    };
    loadDetails();
    loadHistoricalData();
  }, [currency, id]);
  return (
    <div className="coin-details-container">
      <Header />
      {coinDetails ? (
        <div className="coin-details">
          <img src={coinDetails.image.large} />
          <h1>
            {coinDetails.name} ({coinDetails.symbol.toUpperCase()})
          </h1>
          {historicalData && (
            <LineChart historicalData={historicalData} className="line-chart" />
          )}
          <div className="infos">
            <div className="info">
              <p>Crypto Market Rank</p>
              <p>{coinDetails.market_cap_rank}</p>
            </div>
            <div className="info">
              <p>Current Price</p>
              <p>{coinDetails.market_data.current_price[currency]}</p>
            </div>
            <div className="info">
              <p>Market Cap</p>
              <p>{CoinDetails}</p>
            </div>
            <div className="info">
              <p>24 Hour high</p>
              <p>{CoinDetails.market_cap_rank}</p>
            </div>
            <div className="info">
              <p>24 Hour low</p>
              <p>{CoinDetails.market_cap_rank}</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="loading"></div>
      )}
      <Footer />
    </div>
  );
}
