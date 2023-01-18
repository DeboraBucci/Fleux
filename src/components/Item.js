import React from "react";
import { Link } from "react-router-dom";

const Item = ({ title, img, description, price, rating, id }) => {
  return (
    <li className="item">
      <div className="item__img">
        <img src={img} alt={description} />
      </div>
      <div className="item__text">
        <div>
          <h3 className="item__title">
            {title.slice(0, 60)}
            {title.length > 60 && "..."}
          </h3>
          <p className="item__description">
            {description.slice(0, 90)}
            {description.length > 90 && "..."}
          </p>
          <div className="item__extra">
            <p className="item__price">$ {price}</p>
            <p className="item__rating">
              {rating} <i className="fa-solid fa-star"></i>
            </p>
          </div>
        </div>
        <div className="item__cta">
          <Link to={`/item/${id}`} className="item__btn">
            See details
          </Link>
        </div>
      </div>
    </li>
  );
};

export default Item;
