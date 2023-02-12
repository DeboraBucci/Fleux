import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  collection,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore";

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

    const database = getFirestore();
    const querySnapshot = collection(database, "products");

    const newConfig = category
      ? query(querySnapshot, where("category", "==", category))
      : querySnapshot;

    getDocs(newConfig)
      .then((res) => {
        const data = res.docs.map((doc) => {
          const obj = doc.data();
          return { ...obj, id: doc.id };
        });

        setProducts(data);
        setIsLoading(false);
      })
      .catch((err) => console.log(err));
  }, [category, categoryString]);

  return (
    <div className="items-container">
      {category && (
        <p className="path">
          <Link to="/">
            <span>HOME</span>
          </Link>{" "}
          / <span>{category ? category.toUpperCase() : ""}</span>
        </p>
      )}
      <h2>{greeting}</h2>

      <Spinner loading={isLoading} />

      {!isLoading && (
        <ul className="item-list">
          {products.map((product) => (
            <Item
              title={product.title}
              description={product.description}
              img={product.image}
              rating={product.ratings.rating}
              price={product.price}
              key={product.id}
              id={product.id}
              stock={product.stock}
            />
          ))}
        </ul>
      )}
    </div>
  );
};

export default ItemList;
