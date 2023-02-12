import { useRef } from "react";

const ItemCount = ({ stock, onAddToCart }) => {
  const selectRef = useRef(null);

  let optsEl = [];

  for (let i = 1; i <= stock; i++) {
    optsEl.push(
      <option value={i} key={`unit--${i}`}>{`${i} unit${
        i === 0 ? "" : "s"
      }`}</option>
    );
  }

  const addToCartHandler = () => {
    onAddToCart(+selectRef.current.value);
  };

  return (
    stock !== 0 && (
      <>
        <div className="product-details__selector">
          <span>Quantity:</span>
          <select ref={selectRef}>{optsEl}</select>
        </div>
        <div className="product-details__cta">
          <button className="product-details__btn--1">Buy now</button>
          <button
            className="product-details__btn--2"
            onClick={addToCartHandler}
          >
            Add to cart
          </button>
        </div>
      </>
    )
  );
};

export default ItemCount;
