import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./Main.css";
import { Header } from "./Header";
import { Footer } from "./Footer";

export function Main({ currency, symbols, setCurrency }) {
  const [coins, setCoins] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const { searchQuery } = useParams(); // <-- to get the :searchQuery param from URL
  const navigate = useNavigate();

  useEffect(() => {
    async function getData() {
      try {
        if (!searchQuery) {
          const response = await axios.get(
            `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=10&page=1`
          );
          setCoins(response.data);
        } else {
          const matched = await axios.get(
            `https://api.coingecko.com/api/v3/search?query=${searchQuery.toLowerCase()}`
          );
          const listOfMatched = matched.data;
          const promises = listOfMatched.coins.map((coin) =>
            axios.get(
              `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&ids=${coin.id}`
            )
          );

          const results = await Promise.all(promises);
          console.log(results);
          const temp = results.map((res) => res.data[0]);
          setCoins(temp);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setCoins([]);
      }
    }

    getData();
  }, [currency, searchQuery]);

  function handleSearch() {
    if (inputValue.trim() === "") navigate("/");
    else navigate(`/search/${inputValue.toLowerCase()}`);
  }
  return (
    <main>
      <Header currency={currency} setCurrency={setCurrency} />
      <h1>
        Largest <br /> Crypto Marketplace
      </h1>
      <p>
        Welcome to the world's largest cryptocurrency marketplace.
        <br /> Sign up to explore more about cryptos.
      </p>
      <div className="input-container">
        <input
          type="text"
          placeholder="Search crypto ..."
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
          }}
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      <div className="currency-container">
        <table>
          <thead>
            <tr style={{ cursor: "default" }}>
              <td>#</td>
              <td>Coins</td>
              <td>Price</td>
              <td>24H Change</td>
              <td>Market cap</td>
            </tr>
          </thead>
          <tbody>
            {coins.map((coin, i) => {
              return (
                <tr
                  onClick={() => navigate(`/coin/${coin.id}`)}
                  key={crypto.randomUUID()}
                >
                  <td>{i + 1}</td>
                  <td>
                    <img src={coin.image} />
                    {coin.name} - {coin.symbol}
                  </td>
                  <td>
                    {symbols[currency]} {coin.current_price}
                  </td>
                  <td
                    className={
                      Number(coin.price_change_percentage_24h) < 0
                        ? "red"
                        : "green"
                    }
                  >
                    {coin.price_change_percentage_24h}
                  </td>
                  <td>
                    {symbols[currency]} {coin.market_cap}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <Footer />
    </main>
  );
}
