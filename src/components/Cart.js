import { useContext } from "react";
import { Link } from "react-router-dom";
import CartContext from "../context/cart-context";
import CartItem from "./CartItem";

const Cart = () => {
  const cartCtx = useContext(CartContext);

  const clearCartHandler = () => cartCtx.clearCart();

  return (
    <div className="cart__container">
      <div className="cart">
        {cartCtx.items.length !== 0 ? (
          <>
            <ul className="cart__list">
              {cartCtx.items.map((item) => (
                <CartItem item={item} key={"cart-item--" + item.id} />
              ))}
            </ul>

            <div className="cart__footer">
              <div className="cart__price">
                <p>Total price</p> <p>${cartCtx.totalPrice?.toFixed(2)}</p>
              </div>

              <div className="cart__cta">
                <button className="cart__btn--clear" onClick={clearCartHandler}>
                  Clear cart
                </button>
                <Link to="/form" className="cart__btn--buy">
                  Buy now
                </Link>
              </div>
            </div>
          </>
        ) : (
          // EMPTY CART MESSAGE
          <div className="cart__message">
            <p className="cart__message--p1">Your cart is empty</p>
            <p className="cart__message--p2">
              Don't know what to buy, browse our products!
            </p>
            <Link to="/" className="cart__message--btn">
              Products
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};
export default Cart;
