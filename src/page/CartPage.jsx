// CartPage.js
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { remove, increment, decrement } from "../redux/slice/CartSlice";

const CartPage = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);

  console.log(cart);

  const getTotalPrice = () => {
    // Calculate total price based on dummy data
    return cart.reduce(
      (accumulator, item) => accumulator + item.quantity * item.unitPrice,
      0
    );
  };

  const removeItem = (productId) => {
    // Implement your logic for removing an item from the cart here
    dispatch(remove(productId));
  };

  const incrementQuantity = (productId) => {
    dispatch(increment(productId));
  };

  const decrementQuantity = (productId) => {
    dispatch(decrement(productId));
  };

  const totalPrice = getTotalPrice();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-8">Cart Page</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          <table className="w-full border-collapse border">
            <thead>
              <tr>
                <th className="border p-2">Product</th>
                <th className="border p-2">Image</th>
                <th className="border p-2">Quantity</th>
                <th className="border p-2">Unit Price</th>
                <th className="border p-2">Total Price</th>
                <th className="border p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item, index) => (
                <tr key={index}>
                  <td className="border p-2">{item.name}</td>
                  <td className="border p-2">
                    <img
                      src={item.img}
                      alt={item.name}
                      className="w-16 h-16 object-cover"
                    />
                  </td>
                  <td className="border p-2">
                    <button
                      onClick={() => decrementQuantity(item.name)}
                      className="text-gray-500 hover:text-gray-700 transition"
                    >
                      -
                    </button>
                    <span className="mx-2">{item.quantity}</span>
                    <button
                      onClick={() => incrementQuantity(item.name)}
                      className="text-gray-500 hover:text-gray-700 transition"
                    >
                      +
                    </button>
                  </td>
                  <td className="border p-2">₹{item.unitPrice}</td>
                  <td className="border p-2">
                    ₹{item.quantity * item.unitPrice}
                  </td>
                  <td className="border p-2">
                    <button
                      onClick={() => removeItem(item.name)}
                      className="bg-red-500 text-white px-2 py-1 rounded-md"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="mt-4">
            <p className="text-lg font-bold">Total Price: ₹{totalPrice}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
