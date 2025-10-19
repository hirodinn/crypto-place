import axios from "axios";
import { useEffect, useState } from "react";
import "./Main.css";
import { Header } from "./Header";

export function Main() {
  const [coins, setCoins] = useState([]);
  useEffect(() => {
    async function getData() {
      const response = await axios.get(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1"
      );
      setCoins(response.data);
    }
    getData();
  }, []);
  return (
    <main>
      <Header />
      <h1>
        Largest <br /> Crypto Marketplace
      </h1>
      <p>
        Welcome to the world's largest cryptocurrency marketplace.
        <br /> Sign up to explore more about cryptos.
      </p>
      <div className="input-container">
        <input type="text" placeholder="Search crypto ..." />
        <button>Search</button>
      </div>
      <div className="currency-container">
        <table>
          <thead>
            <tr>
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
                <tr>
                  <td>{i + 1}</td>
                  <td>
                    <img src={coin.image} />
                    {coin.name} - {coin.symbol}
                  </td>
                  <td>$ {coin.current_price}</td>
                  <td
                    className={
                      Number(coin.price_change_percentage_24h) > 0
                        ? "red"
                        : "green"
                    }
                  >
                    {coin.price_change_percentage_24h}
                  </td>
                  <td>$ {coin.market_cap}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <footer>Copyright @ 2024, Cryptoplace - All Right Reserved.</footer>
    </main>
  );
}
