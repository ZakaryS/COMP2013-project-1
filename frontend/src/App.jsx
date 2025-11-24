import "./App.css";
import products from "./data/products"; // change to database.
import GroceriesAppContainer from "./Components/GroceriesAppContainer";
function App() {
  return (
  <>
  <GroceriesAppContainer products={products} />
  </>
  );
}

export default App;
