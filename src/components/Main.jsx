import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "./Main.css";
import { Header } from "./Header";
import { Footer } from "./Footer";

export function Main({ currency, symbols, setCurrency }) {
  const [coins, setCoins] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [coinContainer, setCoinContainer] = useState([]);
  const [suggesitions, setSuggestions] = useState([]);
  const [showSuggesiton, setShowSuggestion] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    async function getData() {
      const response = await axios.get(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}`
      );
      setCoins(response.data.slice(0, 10));
      setCoinContainer(response.data);
      setSuggestions(response.data);
      setInputValue("");
    }

    getData();
  }, [currency]);

  useEffect(() => {
    const query = inputValue.trim().toLowerCase();
    const filtered = coinContainer.filter((coin) =>
      coin.name.toLowerCase().includes(query)
    );
    if (filtered.length > 0) {
      setSuggestions(filtered);
    } else {
      setSuggestions([]); // clear or show a 'no results' message
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputValue]);

  function handleSearch() {
    const query = inputValue.trim().toLowerCase();
    const filtered = coinContainer.filter((coin) =>
      coin.name.toLowerCase().includes(query)
    );

    if (filtered.length > 0) {
      setCoins(filtered);
    } else {
      setCoins([]); // clear or show a 'no results' message
    }
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
            if (e.target.value === "") {
              setCoins(coinContainer.slice(0, 10));
              setShowSuggestion(false);
            }
            setInputValue(e.target.value);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSearch();
          }}
        />
        <p
          onClick={() => {
            setShowSuggestion(!showSuggesiton);
          }}
        >
          ▼
        </p>
        <datalist id="coinlist" className={showSuggesiton ? "" : "hide"}>
          {suggesitions.map((suggestion) => {
            return (
              <option
                value={suggestion.name}
                onClick={(e) => {
                  setInputValue(e.target.value);
                  setShowSuggestion(false);
                }}
              >
                {suggestion.name}
              </option>
            );
          })}
        </datalist>
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
                <tr onClick={() => navigate(`/coin/${coin.id}`)} key={coin.id}>
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
