import { Route, Routes } from "react-router-dom";
import { Main } from "./components/Main";
import { CoinDetails } from "./components/CoinDetails";
export default function App() {
  return (
    <Routes>
      <Route index element={<Main />} />
      <Route path="/coin/:id" element={<CoinDetails />} />
    </Routes>
  );
}
