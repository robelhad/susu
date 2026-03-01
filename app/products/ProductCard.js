"use client";
import { useState, useEffect } from "react";
import { useRef } from "react";

export default function ProductCard({ product }) {
  const buttonRef = useRef(null);
  const [cartCount, setCartCount] = useState(0);
  useEffect(() => {
    updateCartCount();
  }, []);
            function updateCartCount() {
              if (typeof window === "undefined") return;
            let cart = sessionStorage.getItem('cart');
            cart = cart ? JSON.parse(cart) : [];
            const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
            //document.getElementById('cartCount').innerText = totalItems;
            setCartCount(totalItems);
          }
          
          // Function to create a fireworks effect around the cart button.
          function showFireworks() {
            if (!buttonRef.current) return;
            const cartButton = document.getElementById('cartButton');
            if (!cartButton) return;
            const rect = cartButton.getBoundingClientRect(); //buttonRef.current.getBoundingClientRect();//
            // Create a container for fireworks positioned over the button.
            console.log("Button position:", rect);
            const container = document.createElement('div');
            container.className = 'fireworks-container';
            container.style.position = "absolute";
            container.style.pointerEvents = "none";
            container.style.left = rect.left + 'px';
            container.style.top = rect.top + 'px';
            container.style.width = rect.width + 'px';
            container.style.height = rect.height + 'px';
            document.body.appendChild(container);
            
            // Create multiple sparkles.
            for (let i = 0; i < 10; i++) {
              const sparkle = document.createElement('div');
              sparkle.className = 'firework';
              sparkle.style.position = "absolute";
      sparkle.style.width = "8px";
      sparkle.style.height = "8px";
      sparkle.style.background = "gold";
      sparkle.style.borderRadius = "50%";
      sparkle.style.opacity = "1";
      sparkle.style.transition = "transform 0.8s ease-out, opacity 0.8s";
              // Random angle and distance.
              const angle = Math.random() * 2 * Math.PI;
              const distance = Math.random() * 30;
              const dx = Math.cos(angle) * distance;
              const dy = Math.sin(angle) * distance;
              sparkle.style.setProperty('--dx', dx + 'px');
              sparkle.style.setProperty('--dy', dy + 'px');
              container.appendChild(sparkle);
            }
            // Remove the container after the animation completes.
            setTimeout(() => {
              container.remove();
            }, 1000);
          }
  function addToCart() {
    
    // your cart logic here
      if (typeof window === "undefined") return;
            let cart = sessionStorage.getItem('cart');
            cart = cart ? JSON.parse(cart) : [];
            const existingItem = cart.find(item => item.id === product.id);
            if (existingItem) {
              existingItem.quantity += 1;
            } else {
              cart.push({ id: product.id , name: product.name, price: product.price, quantity: 1 });
            }
            sessionStorage.setItem('cart', JSON.stringify(cart));
            alert("Added to cart!");
            console.log("Added:", product.name);
            updateCartCount();
            showFireworks();
  }

  return (
    <>
          <div className="d-flex justify-content-end align-items-center mb-3">
        <button
          id="cartButton"
          className="btn btn-secondary"
          onClick={() => (window.location.href = "/cart")}
        >
          <i className="fas fa-shopping-cart"></i> Cart ({cartCount})
        </button>
      </div>

      

    <div className="d-flex justify-content-between align-items-center mb-3 border p-2">
     <div className="d-flex align-items-center">
      <img
        src={`/static/${product.image}`}
        style={{
                  width: "250px",
                  height: "250px",
                  objectFit: "cover",
                  marginRight: "0px",
                }}
        alt={product.name}
      />
      <div className="d-flex flex-column">
      <span className="fw-bold"><h3>{product.name}</h3></span>
      <span className="text-muted"><p>${product.price.toFixed(2)}</p></span>
      </div>
      </div>
      <button
        className="btn btn-success"
        onClick={addToCart}
      >
        Add to Cart
      </button>
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
