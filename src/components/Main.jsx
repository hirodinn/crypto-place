import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "./Main.css";
import { Header } from "./Header";
import { Footer } from "./Footer";

export function Main({ currency, symbols, setCurrency }) {
  const [coins, setCoins] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [coinContainer, setCoinContainer] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function getData() {
      const response = await axios.get(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}`
      );
      setCoins(response.data);
      setCoinContainer(response.data);
      setInputValue("");
    }

    getData();
  }, [currency]);

  function handleSearch() {
    const query = inputValue.trim().toLowerCase();

    if (query === "") {
      navigate("/"); // go back to main page
    } else {
      const filtered = coinContainer.filter((coin) =>
        coin.name.toLowerCase().includes(query)
      );

      if (filtered.length > 0) {
        setCoins(filtered);
      } else {
        console.log("No matches found");
        setCoins([]); // clear or show a 'no results' message
      }
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
              setCoins(coinContainer);
            }
            setInputValue(e.target.value);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSearch();
          }}
        />
        <button onClick={handleSearch}>Search</button>
        {suggestions.length > 0 && (
          <ul
            style={{
              position: "absolute",
              top: "100%",
              left: 0,
              right: 0,
              background: "white",
              listStyle: "none",
              border: "1px solid #ccc",
              borderTop: "none",
              zIndex: 1000,
              maxHeight: "200px",
              overflowY: "auto",
              padding: 0,
              margin: 0,
            }}
          >
            {suggestions.map((coin) => (
              <li
                key={coin.id}
                onClick={() => {
                  setInputValue(coin.name);
                  navigate(`/search/${coin.name.toLowerCase()}`);
                  setSuggestions([]);
                }}
                style={{
                  padding: "8px",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                <img src={coin.thumb} alt={coin.name} width="20" height="20" />
                {coin.name} ({coin.symbol.toUpperCase()})
              </li>
            ))}
          </ul>
        )}
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
