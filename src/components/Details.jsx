import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function Details() {
  const { id } = useParams();
  const [coin, setCoin] = useState(null);
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const [coinRes, chartRes] = await Promise.all([
        axios.get(`https://api.coingecko.com/api/v3/coins/${id}`),
        axios.get(`https://api.coingecko.com/api/v3/coins/${id}/market_chart`, {
          params: { vs_currency: "usd", days: 7 },
        }),
      ]);

      setCoin(coinRes.data);
      const formatted = chartRes.data.prices.map(([timestamp, price]) => ({
        date: new Date(timestamp).toLocaleDateString(),
        price,
      }));
      setChartData(formatted);
    }

    fetchData();
  }, [id]);

  if (!coin) return <h2>Loading...</h2>;

  return (
    <div style={{ textAlign: "center", padding: "40px", color: "white" }}>
      <img src={coin.image.large} alt={coin.name} width={80} />
      <h2>
        {coin.name} ({coin.symbol.toUpperCase()})
      </h2>

      <div style={{ width: "70%", margin: "auto" }}>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="price" stroke="#4f46e5" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div
        style={{
          marginTop: "30px",
          textAlign: "left",
          width: "60%",
          marginInline: "auto",
        }}
      >
        <p>Crypto Market Rank: {coin.market_cap_rank}</p>
        <p>
          Current Price: ${coin.market_data.current_price.usd.toLocaleString()}
        </p>
        <p>Market Cap: ${coin.market_data.market_cap.usd.toLocaleString()}</p>
        <p>24 Hour High: ${coin.market_data.high_24h.usd}</p>
        <p>24 Hour Low: ${coin.market_data.low_24h.usd}</p>
      </div>
    </div>
  );
}
