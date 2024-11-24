const express = require("express");
const {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

const router = express.Router();

// Create a product
router.post(
  "/",
  authMiddleware,
  roleMiddleware(["seller", "admin"]),
  createProduct
);

// Get all products
router.get("/", getProducts);

// Get a single product by ID
router.get("/:id", getProductById);

// Update a product
router.put(
  "/:id",
  authMiddleware,
  roleMiddleware(["seller", "admin"]),
  updateProduct
);

// Delete a product
router.delete("/:id", authMiddleware, roleMiddleware(["admin"]), deleteProduct);

module.exports = router;
