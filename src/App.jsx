import "./App.css";
import "react-loading-skeleton/dist/skeleton.css";
import {Navbar} from "./components/Navbar/index";
// import { Home, Products, About, Product, Cart } from "./pages";
import { Home } from "./pages/home";
import { Products } from "./pages/products";
import { About } from "./pages/about";
import { Product } from "./pages/product";
import { Cart } from "./pages/cart";
import {
  BrowserRouter as Router,
  Routes as Switch,
  Route,
} from "react-router-dom";

function App() {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route path="/" element={<Home />} />
        <Route path="/san-pham" element={<Products />} />
        <Route path="/thong-tin" element={<About />} />
        <Route path="/san-pham/:id" element={<Product />} />
        <Route path="/gio-hang" element={<Cart />} />
      </Switch>
    </Router>
  );
}

export default App;
