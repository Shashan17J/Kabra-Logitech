import React, { useState } from "react";
import { addProductDetails } from "../services/operations/productDetails";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const CreateProduct = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [image, setImage] = useState("");
  const [file, setFile] = useState(null);

  function convertToBase64(e) {
    var reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => {
      setImage(reader.result);
      setFile(e.target.files[0]); // Save the file object
    };
    reader.onerror = (error) => {
      console.log("Error", error);
    };
  }

  const [formData, setFormData] = useState({
    name: "",
    img: null,
    description: "",
    quantity: "",
    unitPrice: "",
  });

  const { name, img, description, quantity, unitPrice } = formData;

  const handleOnChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };
  const handleOnSubmit = (e) => {
    e.preventDefault();

    // Use FormData to handle file uploads
    const formData = new FormData();
    formData.append("name", name);
    formData.append("img", file); // Append the file
    formData.append("description", description);
    formData.append("quantity", quantity);
    formData.append("unitPrice", unitPrice);

    // dispatch form data
    dispatch(addProductDetails(formData, navigate));
  };

  return (
    <div className="w-[600px] mx-auto p-4 border rounded shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-center">Create Product</h2>
      <form onSubmit={handleOnSubmit} className="space-y-4 ">
        <div className="flex flex-col">
          <label htmlFor="productName" className="mb-1">
            Product Name:
          </label>
          <input
            required
            type="text"
            name="name"
            value={name}
            onChange={handleOnChange}
            placeholder="Enter Product Name"
            className=" text-black p-2 border rounded"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="productImage" className="mb-1">
            Product Image:
          </label>
          <input
            required
            type="file"
            accept="image/*"
            name="img"
            onChange={convertToBase64}
            className="p-2 border rounded"
          />
          {image == "" || image == null ? (
            ""
          ) : (
            <img width={100} height={100} src={image} />
          )}
        </div>
        <div className="flex flex-col">
          <label htmlFor="description" className="mb-1">
            Description:
          </label>
          <textarea
            type="text"
            name="description"
            value={description}
            onChange={handleOnChange}
            className="p-2 border rounded"
            placeholder="Enter Description"
            rows="4"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="quantity" className="mb-1">
            Quantity:
          </label>
          <input
            required
            type="number"
            name="quantity"
            value={quantity}
            onChange={handleOnChange}
            placeholder="Enter Quantity"
            className="p-2 border rounded"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="unitPrice" className="mb-1">
            Unit Price:
          </label>
          <input
            required
            type="number"
            name="unitPrice"
            value={unitPrice}
            onChange={handleOnChange}
            placeholder="Enter UnitPrice"
            className="p-2 border rounded"
          />
        </div>
        <button
          type="submit"
          className="bg-green-500 text-white p-2 rounded cursor-pointer"
        >
          Create Product
        </button>
      </form>
    </div>
  );
};

export default CreateProduct;
