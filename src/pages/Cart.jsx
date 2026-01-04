import useStore from "../store/useStore";
import { Link } from "react-router-dom";

export default function Cart() {
  const {
    cart,
    removeFromCart,
    increaseQty,
    decreaseQty,
  } = useStore();

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  if (cart.length === 0) {
    return (
      <div style={{ padding: "20px" }}>
        <h2>Your Cart</h2>
        <p>Cart is empty</p>
      </div>
    );
  }

  return (
    <div style={{ padding: "20px" }}>
      <h2>Your Cart</h2>

      {cart.map((item) => (
        <div className="cart-item" key={item.id}>
          <img src={item.image} alt={item.title} />

          <div>
            <h4>{item.title}</h4>
            <p>₹ {item.price}</p>

            {/* QUANTITY CONTROLS */}
            <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
              <button onClick={() => decreaseQty(item.id)}>-</button>
              <span>{item.qty}</span>
              <button onClick={() => increaseQty(item.id)}>+</button>
            </div>

            {/* REMOVE */}
            <button
              style={{ marginTop: "10px", color: "red" }}
              onClick={() => removeFromCart(item.id)}
            >
              Remove
            </button>
          </div>
        </div>
      ))}

      {/* TOTAL */}
      <h3 style={{ marginTop: "20px" }}>
        Total: ₹ {total.toFixed(2)}
      </h3>

      {/* CHECKOUT */}
      <Link to="/checkout" className="checkout-btn">
        Proceed to Checkout
      </Link>
    </div>
  );
}
