import React, { useContext } from "react";
import CartContext from "../context/cart-context";

const CartWidget = () => {
  const cartCtx = useContext(CartContext);

  return (
    <div className="cart-widget">
      <i className="fa-solid fa-cart-flatbed"></i>
      <span>
        {cartCtx.items
          ? cartCtx.items
              ?.map((item) => item.quantity)
              .reduce((acc, curr) => acc + curr, 0)
          : 0}
      </span>
    </div>
  );
};

export default CartWidget;
