import { useContext, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  addDoc,
  getFirestore,
  collection,
  doc,
  writeBatch,
} from "firebase/firestore";

import CartContext from "../context/cart-context";
import Swal from "sweetalert2";
import Spinner from "./Spinner";

const CartForm = () => {
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const nameRef = useRef(null);
  const surnameRef = useRef(null);
  const emailRef = useRef(null);
  const phoneRef = useRef(null);

  const cartCtx = useContext(CartContext);

  const sendOrder = (order) => {
    setIsLoading(true);

    const db = getFirestore();
    const ordersCollection = collection(db, "orders");

    addDoc(ordersCollection, order)
      .then(({ id }) => {
        Swal.fire({
          title: "Successful Order!",
          icon: "success",
          text: `Here is your order id: ${id}`,
        });

        nameRef.current.value = "";
        surnameRef.current.value = "";
        emailRef.current.value = "";
        phoneRef.current.value = "";
        cartCtx.clearCart();

        navigate("/");
        setIsLoading(false);
      })
      .catch((err) => console.log(err));
  };

  const updateStock = (items) => {
    const db = getFirestore();
    const batch = writeBatch(db);

    items.forEach((item) => {
      const querySnapshot = doc(db, "products", item.id);
      batch.update(querySnapshot, { stock: item.stock - item.quantity });
      batch.commit();
    });
  };

  const submitHandler = (e) => {
    e.preventDefault();

    const buyerName = nameRef.current.value + " " + surnameRef.current.value;
    const phone = phoneRef.current.value;
    const email = emailRef.current.value;

    const items = cartCtx.items.map((item) => ({
      id: item.id,
      title: item.title,
      price: item.price,
      quantity: item.quantity,
    }));

    const order = {
      buyer: {
        name: buyerName,
        phone,
        email,
      },
      items: items,
      total: cartCtx.totalPrice,
    };

    if (
      buyerName.trim().length === 0 ||
      phone.trim().length === 0 ||
      email.trim().length === 0 ||
      items.length === 0
    ) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Invalid credentials",
      });

      return;
    }

    sendOrder(order);
    updateStock(cartCtx.items);
  };

  return (
    <div className="form__container">
      <div className="form__modal">
        <form className="form">
          <h3>Insert your information</h3>
          <div className="form__inputs-box">
            <div className="form__input-group">
              <label>Name</label>
              <input type="text" ref={nameRef} required />
            </div>

            <div className="form__input-group">
              <label>Surname</label>
              <input type="text" ref={surnameRef} required />
            </div>

            <div className="form__input-group">
              <label>Email</label>
              <input type="email" ref={emailRef} required />
            </div>

            <div className="form__input-group">
              <label>Phone</label>
              <input type="text" ref={phoneRef} required />
            </div>
          </div>
          <div className="form__cta">
            <button type="submit" onClick={submitHandler}>
              Purchase
            </button>
            <Link to="/cart">Back to Cart</Link>
          </div>
        </form>

        <div className="form__information">
          <ul className="form__list">
            <h3>Your Items</h3>
            {cartCtx.items.map((item) => (
              <li key={item.id} className="form__item">
                <div className="form__img">
                  <img src={`/images/${item.image}.webp`} alt={item.title} />
                </div>
                <h4>{item.title}</h4>
                <p>${(item.price * item.quantity).toFixed(2)}</p>
              </li>
            ))}
          </ul>
          <p className="form__total-price">
            Total: ${cartCtx.totalPrice.toFixed(2)}
          </p>
        </div>
      </div>

      {isLoading && (
        <div className="loading-window">
          <Spinner loading={isLoading} />
        </div>
      )}
    </div>
  );
};
export default CartForm;
