import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import CartContext from "../context/cart-context";

const CartItem = ({ item }) => {
  const cartCtx = useContext(CartContext);
  const [currQuantity, setCurrentQuantity] = useState(item.quantity);

  const deleteItemHandler = () => cartCtx.removeItem(item.id);

  const decreaseItemQuantityHandler = () => {
    // if (item.quantity < 1) return;

    console.log("wa");

    setCurrentQuantity(item.quantity - 1);
    cartCtx.decreaseItemQuantity(item.id);
  };

  const increaseItemQuantityHandler = () => {
    if (item.quantity === item.stock) return;

    setCurrentQuantity(item.quantity + 1);
    cartCtx.increaseItemQuantity(item.id);
  };

  const changeInputHandler = (e) => {
    const newQuantity = +e.target.value;

    if (isNaN(newQuantity)) return;

    if (newQuantity === 0)
      return setCurrentQuantity((prevQuantity) => prevQuantity);

    setCurrentQuantity(newQuantity);
    cartCtx.updateItemQuantity(item, newQuantity);
  };

  return (
    <li key={item.id} className="cart__item">
      <div className="cart__item-heading">
        <Link to={`/item/${item.id}`}>
          <div className="cart__img">
            <img src={`/images/${item.image}.webp`} alt={item.title} />
          </div>
        </Link>
        <Link className="cart__link" to={`/item/${item.id}`}>
          <h4>{item.title}</h4>
        </Link>
      </div>

      <div className="cart__opts-container">
        <div className="cart__item-options">
          <div className="cart__controler">
            <i
              className={`fa-solid fa-minus ${
                item.quantity === 1 ? "disabled-controller" : ""
              }`}
              onClick={decreaseItemQuantityHandler}
            ></i>
            <input
              type="text"
              value={currQuantity}
              onChange={changeInputHandler}
            />
            <i
              className="fa-solid fa-plus"
              onClick={increaseItemQuantityHandler}
            ></i>
          </div>

          <button className="cart__delete-item" onClick={deleteItemHandler}>
            <i className="fa-solid fa-trash"></i>
          </button>

          <div className="cart__item-price">
            <p>${(item.price * item.quantity).toFixed(2)}</p>
          </div>
        </div>
        {currQuantity > item.stock ? (
          <p className="item-err-message">Exceeds item's available units</p>
        ) : (
          <p className="item-available-units">{item.stock} available units</p>
        )}
      </div>
    </li>
  );
};
export default CartItem;
