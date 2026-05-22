"use client";
import { useState } from "react";
import { useCart } from "../app/context/CartContext";
import CartDrawer from "./CartDrawer";

export default function Header() {
  const { totalItems } = useCart();
  const [cartOpen, setCartOpen] = useState(false);
  return (
    <>
      <header className="header-gradient shadow-lg sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div style={{ width: 44, height: 44, borderRadius: "50%", background: "#FFD700", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22 }}>⚡</div>
            <div>
              <h1 className="font-display text-white text-3xl leading-none tracking-wide">EL RAYO</h1>
              <p style={{ color: "#fde68a", fontSize: 10, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase" }}>Bazar Mayorista · Villa Lugano</p>
            </div>
          </div>
          <button onClick={() => setCartOpen(true)}
            style={{ position: "relative", display: "flex", alignItems: "center", gap: 8, background: "#FFD700", border: "none", borderRadius: 24, padding: "8px 16px", fontFamily: "'Bebas Neue', sans-serif", fontSize: 16, letterSpacing: "0.05em", cursor: "pointer" }}>
            <span>🛒</span> MI PEDIDO
            {totalItems > 0 && (
              <span style={{ position: "absolute", top: -8, right: -8, background: "#E8200A", color: "white", borderRadius: "50%", width: 22, height: 22, fontSize: 11, fontWeight: 800, display: "flex", alignItems: "center", justifyContent: "center" }}>{totalItems}</span>
            )}
          </button>
        </div>
        <div className="flame-divider" />
      </header>
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
}
