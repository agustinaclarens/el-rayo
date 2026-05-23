"use client";
import { useState, useMemo } from "react";
import Header from "../components/Header";
import ProductCard from "../components/ProductCard";
import { products, categories } from "./data/products";

export default function Home() {
  const [activeCategory, setActiveCategory] = useState("Todos");
  const [search, setSearch] = useState("");
  const filtered = useMemo(() => products.filter((p) => {
    const matchCat = activeCategory === "Todos" || p.category === activeCategory;
    const matchSearch = search === "" || p.name.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  }), [activeCategory, search]);

  return (
    <div style={{ minHeight: "100vh", background: "#fff8f0" }}>
      <Header />
      <div style={{ background: "linear-gradient(90deg,#c0180a,#E8200A,#F56200,#FFD700)", padding: "14px", textAlign: "center" }}>
        <p className="bebas" style={{ color: "white", fontSize: 32, margin: 0 }}>⚡ CATÁLOGO MAYORISTA ⚡</p>
        <p style={{ color: "#fde68a", fontWeight: 700, margin: 0, fontSize: 13 }}>Productos al por mayor · Villa Lugano · CABA</p>
      </div>
      <main style={{ maxWidth: 1200, margin: "0 auto", padding: "16px" }}>
        <div style={{ position: "relative", maxWidth: 560, margin: "0 auto 12px" }}>
          <span style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)" }}>🔍</span>
          <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Buscar productos..."
            style={{ width: "100%", paddingLeft: 36, paddingRight: 16, paddingTop: 10, paddingBottom: 10, borderRadius: 24, border: "1.5px solid #fed7aa", fontSize: 14, outline: "none", background: "white" }} />
        </div>
        <div style={{ display: "flex", gap: 8, overflowX: "auto", paddingBottom: 8, marginBottom: 16 }}>
          {categories.map((cat) => (
            <button key={cat} onClick={() => setActiveCategory(cat)}
              className={`cat-pill${activeCategory === cat ? " active" : ""}`}
              style={{ flexShrink: 0, padding: "6px 14px", borderRadius: 20, border: "1.5px solid #fed7aa", background: activeCategory === cat ? "" : "white", fontSize: 13, fontWeight: 700, whiteSpace: "nowrap" }}>
              {cat}
            </button>
          ))}
        </div>
        <p style={{ fontSize: 12, color: "#9ca3af", fontWeight: 700, marginBottom: 12 }}>{filtered.length} productos encontrados</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 16 }}>
          {filtered.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      </main>
      <footer style={{ marginTop: 40, padding: 28, background: "#111827", textAlign: "center" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, marginBottom: 4 }}>
          <span style={{ fontSize: 22 }}>⚡</span>
          <span className="bebas" style={{ color: "white", fontSize: 22 }}>EL RAYO</span>
        </div>
        <p style={{ color: "#9ca3af", fontSize: 13, margin: 0 }}>Bazar Mayorista · Villa Lugano, CABA</p>
        <p style={{ color: "#6b7280", fontSize: 12, marginTop: 4 }}>💳 Transferencia: <span style={{ color: "#fbbf24", fontWeight: 800 }}>ELRAYO.LUGANO</span></p>
      </footer>
    </div>
  );
}
