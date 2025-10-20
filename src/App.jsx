import { Route, Routes } from "react-router-dom";
import { Main } from "./components/Main";
import { CoinDetails } from "./components/CoinDetails";
import { useState } from "react";
export default function App() {
  const [currency, setCurrency] = useState("usd");
  return (
    <Routes>
      <Route
        index
        element={<Main currency={currency} setCurrency={setCurrency} />}
      />
      <Route path="/coin/:id" element={<CoinDetails currency={currency} />} />
    </Routes>
  );
}
