import React, { useState } from "react";
import "./App.css";

const initialProducts = [
  {
    id: 1,
    name: "Nike Classic Sneaker",
    price: 75,
    image:
      "/images/nike.jpeg",
  },
  {
    id: 2,
    name: "Nike Running Shoes",
    price: 80,
    image:
      "/images/download.jpeg"
  },
  {
    id: 3,
    name: "Addidas",
    price: 60,
    image:
      "/images/addidas.jpeg"
  },
  {
    id: 4,
    name: "Puma",
    price: 120,
    image:
    "/images/puma.jpeg"    
  },
];

function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo">ShoeStore</div>

      <ul className="nav-links">
        <li>Home</li>
        <li>Products</li>
        <li>Category</li>
        <li>Contact</li>
      </ul>
    </nav>
  );
}

function App() {
  const [products] = useState(initialProducts);
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart((prev) => {
      const found = prev.find((p) => p.id === product.id);
      if (found) {
        return prev.map((p) =>
          p.id === product.id ? { ...p, qty: p.qty + 1 } : p
        );
      }
      return [...prev, { ...product, qty: 1 }];
    });
  };

  const decreaseQty = (productId) => {
    setCart((prev) =>
      prev
        .map((p) => (p.id === productId ? { ...p, qty: p.qty - 1 } : p))
        .filter((p) => p.qty > 0)
    );
  };

  const increaseQty = (productId) => {
    setCart((prev) =>
      prev.map((p) =>
        p.id === productId ? { ...p, qty: p.qty + 1 } : p
      )
    );
  };

  const removeItem = (productId) => {
    setCart((prev) => prev.filter((p) => p.id !== productId));
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
  <>
    <Navbar />   {/* navbar OUTSIDE flex container */}

    <div className="app">
      <div className="left">
        <h1>Available Shoes</h1>
        <div className="products">
          {products.map((p) => (
            <div className="card" key={p.id}>
              <div className="img-wrap">
                <img src={p.image} alt={p.name} />
              </div>
              <div className="card-body">
                <h3>{p.name}</h3>
                <div className="price">${p.price}</div>
                <button className="btn" onClick={() => addToCart(p)}>
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="right">
        <div className="cart">
          <h2>Cart</h2>

          {cart.length === 0 && <p>Your cart is empty.</p>}

          {cart.map((item) => (
            <div className="cart-item" key={item.id}>
              <img src={item.image} alt={item.name} />

              <div className="item-info">
                <div className="item-name">{item.name}</div>
                <div>Price: ${item.price}</div>
              </div>

              <div className="item-controls">
                <button onClick={() => decreaseQty(item.id)} className="small-btn">-</button>
                <div className="qty">{item.qty}</div>
                <button onClick={() => increaseQty(item.id)} className="small-btn">+</button>
                <button onClick={() => removeItem(item.id)} className="remove">Remove</button>
              </div>
            </div>
          ))}

          <div className="total">Total: ${total}</div>
        </div>
      </div>
    </div>
  </>
);

}

export default App;
