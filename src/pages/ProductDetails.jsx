import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import useStore from "../store/useStore";

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);
  const [added, setAdded] = useState(false); // ✅ NEW
  const addToCart = useStore((state) => state.addToCart);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`https://fakestoreapi.com/products/${id}`);

        if (!res.ok) {
          throw new Error("API error");
        }

        const text = await res.text(); // ✅ safe
        if (!text) {
          throw new Error("Empty response");
        }

        const data = JSON.parse(text);
        setProduct(data);
      } catch (err) {
        console.error(err);
        setError("Failed to load product");
      }
    };

    fetchProduct();
  }, [id]);

  if (error) return <p>{error}</p>;
  if (!product) return <p>Loading...</p>;

  return (
    <div className="details-container">
      <img src={product.image} alt={product.title} />

      <div className="details-info">
        <h2>{product.title}</h2>
        <p className="details-price">₹ {product.price}</p>
        <p className="details-desc">{product.description}</p>

        <button
          className={`add-btn ${added ? "added" : ""}`}
          onClick={() => {
            addToCart(product);
            setAdded(true);
          }}
        >
          {added ? "Added ✓" : "Add to Cart"}
        </button>
      </div>
    </div>
  );
}
