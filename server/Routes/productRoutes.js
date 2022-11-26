const express = require("express");
const { authSuper } = require("../controllers/authorize");
const {
  registerProduct,
  deleteProduct,
  getProducts,
  updateProduct,
  getProductData,
} = require("../controllers/productControllers");

const productRoutes = express.Router();

productRoutes.post("/register", registerProduct);

productRoutes.post("/all", getProducts);

productRoutes.post("/:id", getProductData);

productRoutes.delete("/delete/:id", deleteProduct);

productRoutes.patch("/update/:id", updateProduct);

module.exports = productRoutes;
