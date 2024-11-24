const express = require("express");
const {
  getCart,
  addToCart,
  updateCartItem,
  removeFromCart,
  clearCart,
} = require("../controllers/cartController");
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

const router = express.Router();

// Get cart for authenticated buyer
router.get("/", authMiddleware, roleMiddleware(["buyer"]), getCart);

// Add a product to the cart
router.post("/", authMiddleware, roleMiddleware(["buyer"]), addToCart);

// Update quantity of a product in the cart
router.put(
  "/:itemId",
  authMiddleware,
  roleMiddleware(["buyer"]),
  updateCartItem
);

// Remove a product from the cart
router.delete(
  "/:itemId",
  authMiddleware,
  roleMiddleware(["buyer"]),
  removeFromCart
);

// Clear the entire cart
router.delete("/", authMiddleware, roleMiddleware(["buyer"]), clearCart);

module.exports = router;
