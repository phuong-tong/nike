import logo from "./logo.svg";
import "./App.css";
import Home from "./pages/Home/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import DetailProductPage from "./pages/DetailProduct/DetailProductPage";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" caseSensitive={true} element={<Home />} />
          <Route path="/detailProduct/:id" element={<DetailProductPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
