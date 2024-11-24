const Cart = require("../models/cart");

exports.getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ buyerId: req.user.userId });
    res.status(200).json(cart || { products: [], totalCartValue: 0 });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    let cart = await Cart.findOne({ buyerId: req.user.userId });

    // If cart doesn't exist, create a new one
    if (!cart) {
      cart = new Cart({
        buyerId: req.user.userId,
        products: [],
        totalCartValue: 0,
      });
    }

    const existingProduct = cart.products.find(
      (p) => p.productId.toString() === productId
    );
    if (existingProduct) {
      existingProduct.quantity += quantity;
    } else {
      cart.products.push({ productId, quantity });
    }

    cart.totalCartValue = cart.products.reduce(
      (sum, p) => sum + p.quantity * p.productPrice,
      0
    );
    await cart.save();

    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Other Cart CRUD functions (updateCartItem, removeFromCart, clearCart) would foll
