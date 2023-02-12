import { useReducer } from "react";
import CartContext from "./cart-context";

const items = JSON.parse(localStorage.getItem("items")) || [];
const price = localStorage.getItem("price") || 0;

const defaultCart = {
  items: [],
  totalPrice: 0,
};

const savedCart = {
  items: items,
  totalPrice: +price,
};

const cartReducer = (state, action) => {
  // ADD
  if (action.type === "ADD") {
    const itemIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    );
    const existingItem = state.items[itemIndex];

    // TO ADD EXISTING ITEM
    if (itemIndex !== -1) {
      const updatedItem = {
        ...existingItem,
        quantity: existingItem.quantity + action.quantity,
      };

      if (existingItem.quantity + action.quantity > existingItem.stock) {
        return {
          items: state.items,
          totalPrice: state.totalPrice,
          error: "Exceeds available units",
        };
      }

      const updatedItems = [...state.items];
      updatedItems[itemIndex] = updatedItem;

      const updatedTotalPrice =
        state.totalPrice + action.item.price * action.quantity;

      return { items: updatedItems, totalPrice: updatedTotalPrice };

      // TO ADD NEW ITEM
    } else {
      if (action.quantity > action.item.stock) {
        return {
          items: state.items,
          totalPrice: state.totalPrice,
          error: "Exceeds available units",
        };
      }

      const newItem = {
        ...action.item,
        quantity: action.quantity,
        stock: action.item.stock,
      };
      const updatedItems = state.items.concat(newItem);
      const updatedTotalPrice =
        state.totalPrice + action.item.price * action.quantity;

      return { items: updatedItems, totalPrice: updatedTotalPrice };
    }
  }

  // REMOVE
  if (action.type === "REMOVE") {
    const updatedItems = state.items.filter((item) => item.id !== action.id);
    const removedItem = state.items.filter((item) => item.id === action.id)[0];
    const updatedTotalPrice =
      state.totalPrice - removedItem.price * removedItem.quantity;

    return { items: updatedItems, totalPrice: updatedTotalPrice };
  }

  // INCREASE
  if (action.type === "INCREASE") {
    const itemIndex = state.items.findIndex((item) => item.id === action.id);
    const existingItem = state.items[itemIndex];
    const updatedItem = {
      ...existingItem,
      quantity: existingItem.quantity++,
    };
    const updatedItems = [...state.items];
    updatedItems[itemIndex] = updatedItem;
    const updatedTotalPrice = state.totalPrice + existingItem.price;
    return { items: updatedItems, totalPrice: updatedTotalPrice };
  }

  // DECREASE
  if (action.type === "DECREASE") {
    const itemIndex = state.items.findIndex((item) => item.id === action.id);
    const existingItem = state.items[itemIndex];

    const updatedItem = {
      ...existingItem,
      quantity: existingItem.quantity--,
    };

    const updatedItems = [...state.items];
    updatedItems[itemIndex] = updatedItem;

    const updatedTotalPrice = state.totalPrice - existingItem.price;

    return { items: updatedItems, totalPrice: updatedTotalPrice };
  }

  // UPDATE
  if (action.type === "UPDATE") {
    const itemIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    );
    const existingItem = state.items[itemIndex];
    const updatedItems = [...state.items];

    if (action.quantity === 0 || action.quantity > existingItem.stock) {
      return { items: state.items, totalPrice: state.totalPrice };
    }

    const updatedItem = {
      ...existingItem,
      quantity: action.quantity,
    };

    updatedItems[itemIndex] = updatedItem;

    const updatedTotalPrice =
      state.totalPrice -
      existingItem.price * state.items[itemIndex].quantity +
      existingItem.price * action.quantity;

    return { items: updatedItems, totalPrice: updatedTotalPrice };
  }

  // CLEAR
  if (action.type === "CLEAR") {
    return defaultCart;
  }

  return savedCart;
};

const CartContextProvider = (props) => {
  const [cartState, dispatchCartAction] = useReducer(cartReducer, savedCart);

  const onAddToCart = (item, quantity) => {
    dispatchCartAction({
      type: "ADD",
      item: item,
      quantity: quantity,
    });
  };

  const onRemovingItemFromCart = (itemId) => {
    dispatchCartAction({ type: "REMOVE", id: itemId });
  };

  const onClearCart = () => {
    dispatchCartAction({ type: "CLEAR" });
  };

  const onDecreaseItemQuantity = (itemId) => {
    dispatchCartAction({ type: "DECREASE", id: itemId });
  };

  const onIncreaseItemQuantity = (itemId) => {
    dispatchCartAction({ type: "INCREASE", id: itemId });
  };

  const onUpdateItemQuantity = (item, quantity) => {
    dispatchCartAction({ type: "UPDATE", item: item, quantity: quantity });
  };

  const cartContext = {
    items: cartState.items,
    totalPrice: cartState.totalPrice,
    error: cartState.error,
    addItem: onAddToCart,
    removeItem: onRemovingItemFromCart,
    clearCart: onClearCart,
    decreaseItemQuantity: onDecreaseItemQuantity,
    increaseItemQuantity: onIncreaseItemQuantity,
    updateItemQuantity: onUpdateItemQuantity,
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartContextProvider;
