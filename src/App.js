import { BrowserRouter, Route, Routes } from "react-router-dom";

import Navbar from "./components/Navbar";
import ItemDetails from "./components/ItemDetails";
import ItemList from "./components/ItemList";
import Cart from "./components/Cart";
import CartForm from "./components/CartForm";
import { useContext, useEffect } from "react";
import CartContext from "./context/cart-context";

const App = () => {
  const cartCtx = useContext(CartContext);

  useEffect(() => {
    localStorage.setItem("items", JSON.stringify(cartCtx.items));
    localStorage.setItem("total-price", cartCtx.totalPrice);
  }, [cartCtx]);

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={<ItemList greeting="Welcome to our store!" />}
        />
        <Route path="/category/:category" element={<ItemList />} />
        <Route path="/item/:id" element={<ItemDetails />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/form" element={<CartForm />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
