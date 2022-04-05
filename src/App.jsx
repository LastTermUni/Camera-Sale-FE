import "./App.css";
import "react-loading-skeleton/dist/skeleton.css";
import { Navbar } from "./components/Navbar";
import { About } from "./components/pages/about";
import { Home } from "./components/pages/index";
import Products from "./components/pages/products";
import Product from "./components/pages/product";
import {
  BrowserRouter as Router,
  Routes as Switch,
  Route,
} from "react-router-dom";
import Cart from "./components/pages/cart";

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
