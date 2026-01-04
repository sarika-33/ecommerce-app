import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  // STATES
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("https://fakestoreapi.com/products");

        if (!res.ok) {
          throw new Error("API error");
        }

        const text = await res.text();
        if (!text) {
          throw new Error("Empty response");
        }

        const data = JSON.parse(text);
        setProducts(data);
      } catch (err) {
        console.error(err);
        setError("Failed to load products");
      }
    };

    fetchProducts();
  }, []);

  if (error) return <p>{error}</p>;
  if (products.length === 0) return <p>Loading...</p>;

  // SEARCH + FILTER + SORT
  const filteredProducts = products
    .filter((p) => {
      const matchSearch = p.title
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchCategory =
        category === "all" || p.category === category;

      return matchSearch && matchCategory;
    })
    .sort((a, b) => {
      if (sort === "low-high") return a.price - b.price;
      if (sort === "high-low") return b.price - a.price;
      return 0;
    });

  return (
    <>
      {/* 🔍 SEARCH / FILTER / SORT BAR */}
      <div className="toolbar">
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="all">All Categories</option>
          <option value="men's clothing">Men</option>
          <option value="women's clothing">Women</option>
          <option value="electronics">Electronics</option>
          <option value="jewelery">Jewelery</option>
        </select>

        <select value={sort} onChange={(e) => setSort(e.target.value)}>
          <option value="">Sort By</option>
          <option value="low-high">Price: Low → High</option>
          <option value="high-low">Price: High → Low</option>
        </select>
      </div>

      {/* 🛍 PRODUCT GRID */}
      <div className="product-grid">
        {filteredProducts.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </>
  );
}
