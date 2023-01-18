import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Item from "./Item";
import Spinner from "./Spinner";

const ItemList = ({ greeting }) => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const { category } = useParams();
  const categoryString = category?.replace("-", " ");

  useEffect(() => {
    setProducts([]);
    setIsLoading(true);
    fetch(
      `https://fakestoreapi.com/products${
        category !== undefined ? `/category/${categoryString}` : ""
      }`
    )
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setIsLoading(false);
      });
  }, [category, categoryString]);

  return (
    <div className="items-container">
      <p className="path">
        <span>HOME</span> {category ? "/ " : ""}
        <span>{category ? category.toUpperCase() : ""}</span>
      </p>
      <h2>{greeting}</h2>

      <Spinner loading={isLoading} />

      {!isLoading && (
        <ul className="item-list">
          {products.map((product) => (
            <Item
              title={product.title}
              description={product.description}
              img={product.image}
              rating={product.rating.rate}
              price={product.price}
              key={product.id}
              id={product.id}
            />
          ))}
        </ul>
      )}
    </div>
  );
};

export default ItemList;
