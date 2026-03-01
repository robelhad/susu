"use client"; // must be a Client Component to access sessionStorage
import { useState, useEffect } from "react";
import Link from "next/link";


export default function CartPage() {
  const [cart, setCart] = useState([]);

  // Load cart from sessionStorage when component mounts
  useEffect(() => {
    if (typeof window === "undefined") return;

    const storedCart = sessionStorage.getItem("cart");
    setCart(storedCart ? JSON.parse(storedCart) : []);
  }, []);

  // Update cart and sessionStorage
  const updateCart = (productId, quantity) => {
    const newCart = cart.map((item) =>
      item.id === productId ? { ...item, quantity } : item
    ).filter(item => item.quantity > 0);

    setCart(newCart);
    sessionStorage.setItem("cart", JSON.stringify(newCart));
  };

  
const handleCheckout = async  () => {
  const name = prompt("Enter your name");
  const address = prompt("Enter your address");

  if (!name || !address) return alert("Name and address are required");

  const response = await fetch("/api/checkout", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, address, cartItems: cart }),
  });

  const data = await response.json();

  if (data.url) {
    window.location.href = data.url; // redirect to Stripe checkout
  } else {
    alert("Error: " + data.error);
  }
}

  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="container">
      <h1>Your Cart</h1>

      {cart.length === 0 ? (
        <p>Your cart is empty. <Link href="/products">Shop Products</Link></p>
      ) : (
        <div className="cart-items">
          {cart.map((item) => (
            <div key={item.id} className="cart-item card mb-3 p-3 d-flex justify-content-between align-items-center">
              <div>
                <h3>{item.name}</h3>
                <p>${item.price.toFixed(2)} x {item.quantity} = ${(item.price * item.quantity).toFixed(2)}</p>
              </div>
              <div className="cart-controls d-flex align-items-center gap-2">
                <button className="btn btn-sm btn-secondary" onClick={() => updateCart(item.id, item.quantity - 1)}>-</button>
                <span>{item.quantity}</span>
                <button className="btn btn-sm btn-secondary" onClick={() => updateCart(item.id, item.quantity + 1)}>+</button>
              </div>
            </div>
          ))}

          <h3>Total: ${totalPrice.toFixed(2)}</h3>
          <button
            className="btn btn-success"
            onClick={handleCheckout}
            
          >
            Checkout
          </button>
        </div>
      )}
    </div>
  );
}
