import './global';
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { CartProvider } from './context/CartContext'; // ✅ Add this

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <CartProvider> {/* ✅ Wrap App with CartProvider */}
      <App />
    </CartProvider>
  </React.StrictMode>
);
