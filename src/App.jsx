import { Route, Routes } from "react-router-dom";
import { Main } from "./components/Main";
import { ShowStatics } from "./components/ShowStatics";
export default function App() {
  return (
    <Routes>
      <Route index element={<Main />} />
      <Route path="/coin" element={<ShowStatics />} />
    </Routes>
  );
}
