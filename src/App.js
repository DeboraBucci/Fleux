import ItemList from "./components/ItemList";
import Navbar from "./components/Navbar";

const App = () => {
  return (
    <div>
      <Navbar />
      <ItemList greeting="Welcome!" />
    </div>
  );
};

export default App;
