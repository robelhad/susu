"use client";

import { useEffect, useState } from "react";

export default function ProductsClient({ products }) {
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    updateCartCount();
  }, []);

  function addToCart(id, name, price) {
    let cart = sessionStorage.getItem("cart");
    cart = cart ? JSON.parse(cart) : [];

    const existingItem = cart.find((item) => item.id === id);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({ id, name, price, quantity: 1 });
    }

    sessionStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
    showFireworks();
  }

  function updateCartCount() {
    let cart = sessionStorage.getItem("cart");
    cart = cart ? JSON.parse(cart) : [];

    const totalItems = cart.reduce(
      (sum, item) => sum + item.quantity,
      0
    );

    setCartCount(totalItems);
  }

  function showFireworks() {
    const cartButton = document.getElementById("cartButton");
    const rect = cartButton.getBoundingClientRect();

    const container = document.createElement("div");
    container.style.position = "absolute";
    container.style.pointerEvents = "none";
    container.style.left = rect.left + "px";
    container.style.top = rect.top + "px";
    container.style.width = rect.width + "px";
    container.style.height = rect.height + "px";

    document.body.appendChild(container);

    for (let i = 0; i < 10; i++) {
      const sparkle = document.createElement("div");
      sparkle.style.position = "absolute";
      sparkle.style.width = "8px";
      sparkle.style.height = "8px";
      sparkle.style.background = "gold";
      sparkle.style.borderRadius = "50%";
      sparkle.style.opacity = "1";
      sparkle.style.transition = "transform 0.8s ease-out, opacity 0.8s";

      const angle = Math.random() * 2 * Math.PI;
      const distance = Math.random() * 30;
      const dx = Math.cos(angle) * distance;
      const dy = Math.sin(angle) * distance;

      sparkle.style.transform = `translate(${dx}px, ${dy}px)`;
      sparkle.style.opacity = "0";

      container.appendChild(sparkle);
    }

    setTimeout(() => {
      container.remove();
    }, 1000);
  }

  return (
    <>
      {/* Cart Button */}
      <div className="d-flex justify-content-end align-items-center mb-3">
        <button
          id="cartButton"
          className="btn btn-secondary"
          onClick={() => (window.location.href = "/cart")}
        >
          <i className="fas fa-shopping-cart"></i> Cart ({cartCount})
        </button>
      </div>

      <h1 className="mb-4">Our Products</h1>

      <div className="list-group">
        {products.map((product) => (
          <div
            key={product.id}
            className="list-group-item d-flex justify-content-between align-items-center"
          >
            <div className="d-flex align-items-center">
              <img
                src={`/static/${product.image}`}
                alt={product.name}
                style={{
                  width: "250px",
                  height: "250px",
                  objectFit: "cover",
                  marginRight: "15px",
                }}
              />
              <div>
                <h5 className="mb-1">{product.name}</h5>
                <p className="mb-1">
                  ${Number(product.price).toFixed(2)}
                </p>
              </div>
            </div>

            <button
              className="btn btn-success"
              onClick={() =>
                addToCart(product.id, product.name, product.price)
              }
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>

      <div className="text-center mt-4">
        <button
          className="btn btn-primary"
          onClick={() => (window.location.href = "/cart")}
        >
          Go to Cart
        </button>
      </div>
    </>
  );
}
