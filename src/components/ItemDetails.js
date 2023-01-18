import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Spinner from "./Spinner";

const ItemDetails = () => {
  const [product, setProduct] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const params = useParams();

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${params.id}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
        setIsLoading(false);
      });
  }, [params.id]);

  console.log(product);

  return (
    <div className="details-container">
      <Spinner loading={isLoading} />
      {!isLoading && (
        <React.Fragment>
          <p className="path">
            <span>HOME</span> / <span>{product.category?.toUpperCase()}</span>
          </p>
          <div className="product-details">
            <div className="product-details__img">
              <img src={product.image} alt={product.description} />
            </div>
            <div className="product-details__info">
              <div className="product-details__heading">
                <h3 className="product-details__title">{product.title}</h3>
                <p className="product-details__rating">
                  {product.rating.rate} <i className="fa-solid fa-star"></i>{" "}
                  <span>({product.rating.count})</span>
                </p>
                <p className="product-details__price">$ {product.price}</p>
              </div>

              <p className="product-details__description">
                {product.description}
              </p>
              <div className="product-details__selector">
                <span>Quantity:</span>
                <select>
                  <option>1 unit</option>
                  <option>2 units</option>
                  <option>3 units</option>
                  <option>4 units</option>
                  <option>5 units</option>
                </select>
              </div>
              <div className="product-details__cta">
                <button className="product-details__btn--1">Buy now</button>
                <button className="product-details__btn--2">Add to cart</button>
              </div>
            </div>
          </div>
        </React.Fragment>
      )}
    </div>
  );
};

export default ItemDetails;
