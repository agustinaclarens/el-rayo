"use client";
import { useState } from "react";
import { useCart } from "../app/context/CartContext";

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);
  const [qty, setQty] = useState(product.minOrder || 1);
  const handleAdd = () => { addToCart(product, qty); setAdded(true); setTimeout(() => setAdded(false), 1500); };
  const fmt = (n) => new Intl.NumberFormat("es-AR", { style: "currency", currency: "ARS", minimumFractionDigits: 0 }).format(n);
  return (
    <div className="product-card" style={{ background: "white", borderRadius: 16, border: "1px solid #fed7aa", overflow: "hidden", display: "flex", flexDirection: "column" }}>
      <div style={{ background: "linear-gradient(135deg,#fff7ed,#fef2f2)", height: 100, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 52 }}>{product.emoji}</div>
      <div style={{ padding: 12, flex: 1, display: "flex", flexDirection: "column" }}>
        <span style={{ fontSize: 10, color: "#ea580c", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 2 }}>{product.category}</span>
        <h3 className="bebas" style={{ fontSize: 17, margin: "0 0 4px", lineHeight: 1.2 }}>{product.name}</h3>
        <p style={{ fontSize: 12, color: "#9ca3af", lineHeight: 1.4, flex: 1, marginBottom: 6 }}>{product.description}</p>
        {product.minOrder > 1 && <p style={{ fontSize: 11, color: "#ea580c", fontWeight: 700, marginBottom: 4 }}>Mínimo: {product.minOrder} {product.unit}</p>}
        <p className="bebas" style={{ fontSize: 22, color: "#E8200A", marginBottom: 10 }}>{fmt(product.price)} <span style={{ fontSize: 12, fontFamily: "Nunito,sans-serif", fontWeight: 400, color: "#9ca3af" }}>/ {product.unit}</span></p>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ display: "flex", alignItems: "center", border: "1.5px solid #fed7aa", borderRadius: 8, overflow: "hidden" }}>
            <button onClick={() => setQty(Math.max(product.minOrder || 1, qty - 1))} style={{ padding: "6px 10px", background: "white", border: "none", color: "#ea580c", fontWeight: 800, fontSize: 16, cursor: "pointer" }}>−</button>
            <span style={{ padding: "6px 10px", fontWeight: 800, minWidth: 32, textAlign: "center" }}>{qty}</span>
            <button onClick={() => setQty(qty + 1)} style={{ padding: "6px 10px", background: "white", border: "none", color: "#ea580c", fontWeight: 800, fontSize: 16, cursor: "pointer" }}>+</button>
          </div>
          <button onClick={handleAdd} style={{ flex: 1, padding: 8, borderRadius: 8, border: "none", cursor: "pointer", fontFamily: "'Bebas Neue',sans-serif", fontSize: 15, letterSpacing: "0.05em", background: added ? "#22c55e" : "linear-gradient(135deg,#E8200A,#F56200)", color: "white" }}>
            {added ? "✓ AGREGADO" : "AGREGAR"}
          </button>
        </div>
      </div>
    </div>
  );
}
