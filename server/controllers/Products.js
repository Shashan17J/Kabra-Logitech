const Product = require("../models/Products");
const { uploadImageToCloudinary } = require("../utils/imageUploader");
require("dotenv").config();

// createProduct handler funtion
exports.addProduct = async (req, res) => {
  try {
    // fetch data
    let { name, description, quantity, unitPrice } = req.body;

    console.log(name);
    console.log(description);
    console.log(quantity);
    console.log(unitPrice);

    const img = req.files && req.files.img;

    console.log(img);

    if (!img) {
      return res.status(400).json({
        success: false,
        message: "Image file is required",
      });
    }

    // validation (Check if any of the required fields are missing)
    if (!name || !description || !quantity || !unitPrice || !img) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // Upload Image top Cloudinary
    const ImageUrl = await uploadImageToCloudinary(
      img,
      process.env.FOLDER_NAME
    );
    console.log(ImageUrl);

    // create an entry
    const newProduct = await Product.create({
      name,
      img: ImageUrl.secure_url,
      description,
      quantity,
      unitPrice,
    });

    // return res
    return res.status(200).json({
      success: true,
      message: "Product Created Successfully",
      data: newProduct,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to create Product",
      error: error.message,
    });
  }
};

// getAllCourses handler

exports.listAllProducts = async (req, res) => {
  try {
    const allProducts = await Product.find(
      {},
      {
        name: true,
        img: true,
        description: true,
        quantity: true,
        unitPrice: true,
      }
    ).exec();
    return res.status(200).json({
      success: true,
      message: "Data for all products fatched successfully",
      data: allProducts,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Failed Fetch course data",
      error: error.message,
    });
  }
};
