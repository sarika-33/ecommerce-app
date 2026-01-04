import useStore from "../store/useStore";
import { Link } from "react-router-dom";

export default function Navbar() {
  const theme = useStore((state) => state.theme);
  const toggleTheme = useStore((state) => state.toggleTheme);

  return (
    <nav className="navbar">
      <div className="brand">ShopEasy</div>
      <div className="nav-actions">
        <Link to="/cart" className="cart-link">🛒 Cart</Link>

        <button className="theme-btn" onClick={toggleTheme}>
          {theme === "dark" ? "☀ Light" : "🌙 Dark"}
        </button>
      </div>
    </nav>

  );
}
