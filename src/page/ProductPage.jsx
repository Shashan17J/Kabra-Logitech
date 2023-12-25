// ProductPage.js
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { add, increment, decrement, remove } from "../redux/slice/CartSlice";

import { listAllProducts } from "../services/operations/productDetails";

const ProductPage = () => {
  const dispatch = useDispatch();

  const addToCart = (product) => {
    dispatch(add(product));
    toast.success("Item added to Cart");
  };

  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Calling fetchProductData function to fetch the details
    (async () => {
      try {
        const res = await listAllProducts();
        console.log("product details res: ", res);
        setProducts(res);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-8">Product Page</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map((product, index) => (
          <div
            key={index}
            className="border p-4 rounded-lg shadow-md transition-transform transform hover:scale-105"
          >
            <img
              src={product.img}
              alt={product.name}
              className="w-[49%] lg:w-[75%] h-[60%] sm:h-[70%] overflow-hidden rounded-lg flex items-center px-2"
            />
            <h2 className="text-xl font-bold mb-2">{product.name}</h2>
            <p className="text-gray-600 mb-4">
              {product.description.split(" ").slice(0, 10).join(" ") + "..."}
            </p>
            <div className="flex justify-between items-center">
              <span className="text-lg font-bold">₹{product.unitPrice}</span>
            </div>
            <button
              onClick={() => addToCart(product)}
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
export default ProductPage;
