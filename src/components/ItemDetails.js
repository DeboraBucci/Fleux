import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { getFirestore, doc, getDoc } from "firebase/firestore";

import CartContext from "../context/cart-context";
import ItemCount from "./ItemCount";
import Spinner from "./Spinner";

import "react-toastify/dist/ReactToastify.css";

const ItemDetails = () => {
  const [product, setProduct] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const params = useParams();
  const cartCtx = useContext(CartContext);

  useEffect(() => {
    const database = getFirestore();
    const querySnapshot = doc(database, "products", params.id);

    getDoc(querySnapshot)
      .then((res) => {
        const obj = res.data();
        setProduct({ ...obj, id: res.id, quantity: 0 });
        setIsLoading(false);
      })
      .catch((err) => console.log(err));
  }, [params.id]);

  const addToCartHandler = (quantity) => {
    const currQuantity = cartCtx.items.find(
      (item) => item.id === product.id
    )?.quantity;

    if (currQuantity + quantity > product.stock) {
      return toast.error(
        "You already have the maximum amount of units of this item!",
        {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        }
      );
    }

    toast("Added to the cart!", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

    cartCtx.addItem(product, quantity);
  };

  return (
    <div className="details-container">
      <ToastContainer />
      <Spinner loading={isLoading} />
      {!isLoading && (
        <>
          <p className="path">
            <Link to="/">
              <span>HOME</span>
            </Link>{" "}
            /{" "}
            <Link to={`/category/${product.category}`}>
              <span>{product.category?.toUpperCase()}</span>
            </Link>
          </p>
          <div className="product-details">
            <div className="product-details__img">
              <img
                src={`/images/${product.image}.webp`}
                alt={product.description}
              />
            </div>
            <div className="product-details__info">
              {product.stock === 0 && (
                <span className="out-of-stock">Out of Stock</span>
              )}
              <div className="product-details__heading">
                <h3 className="product-details__title">{product.title}</h3>
                <p className="product-details__rating">
                  {product.ratings.rating} <i className="fa-solid fa-star"></i>{" "}
                  <span>({product.ratings.raters})</span>
                </p>
                <p className="product-details__price">$ {product.price}</p>
              </div>

              <p className="product-details__description">
                {product.description}
              </p>
              <ItemCount stock={product.stock} onAddToCart={addToCartHandler} />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ItemDetails;
