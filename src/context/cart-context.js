import React from "react";

const CartContext = React.createContext({
  items: [],
  totalPrice: 0,
  error: "",
  addItem: (item, quantity) => {},
  removeItem: (id) => {},
  clearCart: () => {},
  decreaseItemQuantity: (id) => {},
  increaseItemQuantity: (id) => {},
  updateItemQuantity: (item, quantity) => {},
});

export default CartContext;
