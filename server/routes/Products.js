const express = require("express");
const router = express.Router();

const { addProduct, listAllProducts } = require("../controllers/Products");

// Create Product
router.post("/addProduct", addProduct);
// Get all get all Products
router.get("/listAllProducts", listAllProducts);

module.exports = router;
