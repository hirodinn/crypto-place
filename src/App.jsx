import { Route, Routes } from "react-router-dom";
import { Main } from "./components/Main";
import { CoinDetails } from "./components/CoinDetails";
import { useState } from "react";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
export default function App() {
  const [currency, setCurrency] = useState("usd");
  const symbols = {
    usd: "$",
    eur: "€",
    inr: "₹",
  };
  return (
    <Routes>
      <Route
        index
        element={
          <>
            <Header currency={currency} setCurrency={setCurrency} />
            <Main currency={currency} symbols={symbols} />
            <Footer />
          </>
        }
      />
      <Route
        path="/coin/:id"
        element={
          <>
            <Header currency={currency} setCurrency={setCurrency} />
            <CoinDetails currency={currency} symbols={symbols} />
            <Footer />
          </>
        }
      />
    </Routes>
  );
}
