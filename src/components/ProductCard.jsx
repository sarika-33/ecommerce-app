import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
  return (
    <div className="card">
      <img src={product.image} alt={product.title} />

      <h3 className="title">
        {product.title.length > 40
          ? product.title.slice(0, 40) + "..."
          : product.title}
      </h3>

      <p className="price">₹ {product.price}</p>

      <Link to={`/product/${product.id}`} className="view-btn">
        View Product
      </Link>
    </div>
  );
}
