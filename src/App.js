import { BrowserRouter, Route, Routes } from "react-router-dom";

import Navbar from "./components/Navbar";
import ItemDetails from "./components/ItemDetails";
import ItemList from "./components/ItemList";

const App = () => {
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
      </Routes>
    </BrowserRouter>
  );
};

export default App;
