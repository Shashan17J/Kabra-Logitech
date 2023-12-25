import "./App.css";
import { Route, Routes } from "react-router-dom";
import CreateProduct from "./page/CreateProduct";
import Navbar from "./components/Navbar";
import ProductPage from "./page/ProductPage";
import CartPage from "./page/CartPage";
function App() {
  return (
    <div className="flex min-h-screen w-screen flex-col bg-richblack-900 font-inter">
      <Navbar />
      <Routes>
        <Route path="/" element={<CreateProduct />} />
        <Route path="/products" element={<ProductPage />} />
        <Route path="/cart" element={<CartPage />} />
      </Routes>
    </div>
  );
}

export default App;
