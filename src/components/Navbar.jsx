// Navbar.js
import React from "react";
import { Link } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { useSelector } from "react-redux";

// import { selectTotalQuantity } from "../redux/slice/CartSlice";

import { selectTotalProducts } from "../redux/slice/CartSlice";

const Navbar = () => {
  const totalProducts = useSelector(selectTotalProducts);
  return (
    <nav className="bg-gray-800 p-4">
      <ul className="flex items-center justify-between">
        <img
          src="https://media.licdn.com/dms/image/C510BAQEy1iuQgntspg/company-logo_200_200/0/1630599113727?e=2147483647&v=beta&t=Ir9UZViHlvXAAKgRtWGk7A46Jq-yr4Dd6Reizj731ao"
          alt="Cart"
          className="w-16 h-16 mr-1"
        />
        <li>
          <Link to="/" className="text-white hover:text-gray-300 mr-4">
            Create Product
          </Link>
        </li>
        <li>
          <Link to="/products" className="text-white hover:text-gray-300 mr-4">
            Products
          </Link>
        </li>
        <li className="flex items-center text-white hover:text-gray-300 relative">
          <Link to="/cart" className="text-white hover:text-gray-300">
            <FaShoppingCart className="w-6 h-6 mr-8" />
            {/* Display the total quantity next to the cart icon */}
            {totalProducts > 0 && (
              <span className=" bg-blue-600 text-white px-2 py-1 rounded-full absolute -top-1 -right-1 -mt-6 mr-8 ">
                {totalProducts}
              </span>
            )}
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
