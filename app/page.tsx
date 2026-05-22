"use client";
import { useState, useMemo } from "react";
import Header from "../components/Header";
import ProductCard from "../components/ProductCard";
import { products, categories } from "./data/products";

export default function Home() {
  const [activeCategory, setActiveCategory] = useState("Todos");
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    return products.filter((p) => {
      const matchCat = activeCategory === "Todos" || p.category === activeCategory;
      const matchSearch = search === "" || p.name.toLowerCase().includes(search.toLowerCase()) || p.description.toLowerCase().includes(search.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [activeCategory, search]);

  return (
    <div className="min-h-screen" style={{ background: "#fff8f0" }}>
      <Header />
      <div style={{ background: "linear-gradient(90deg, #c0180a, #E8200A, #F56200, #FFD700)", padding: "14px", textAlign: "center" }}>
        <p className="font-display text-white text-4xl md:text-5xl tracking-wide drop-shadow">⚡ CATÁLOGO MAYORISTA ⚡</p>
        <p style={{ color: "#fde68a", fontWeight: 700, marginTop: 4, fontSize: 13 }}>Productos al por mayor · Villa Lugano · CABA</p>
      </div>
      <main className="max-w-6xl mx-auto px-4 py-6">
        <div className="mb-4">
          <div style={{ position: "relative", maxWidth: 560, margin: "0 auto" }}>
            <span style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "#f97316" }}>🔍</span>
            <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Buscar productos..."
              style={{ width: "100%", paddingLeft: 36, paddingRight: 16, paddingTop: 10, paddingBottom: 10, borderRadius: 24, border: "1.5px solid #fed7aa", fontSize: 14, outline: "none", background: "white" }} />
          </div>
        </div>
        <div style={{ display: "flex", gap: 8, overflowX: "auto", paddingBottom: 8, marginBottom: 20 }}>
          {categories.map((cat) => (
            <button key={cat} onClick={() => setActiveCategory(cat)}
              className={`cat-pill flex-shrink-0 px-4 py-2 rounded-full border text-sm font-bold whitespace-nowrap ${activeCategory === cat ? "active" : "border-orange-200 text-gray-600 bg-white"}`}>
              {cat}
            </button>
          ))}
        </div>
        <p style={{ fontSize: 12, color: "#9ca3af", fontWeight: 700, marginBottom: 12 }}>{filtered.length} productos encontrados</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filtered.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      </main>
      <footer style={{ marginTop: 40, padding: "28px 16px", background: "#111827", textAlign: "center" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, marginBottom: 4 }}>
          <span style={{ fontSize: 22 }}>⚡</span>
          <span className="font-display" style={{ color: "white", fontSize: 22 }}>EL RAYO</span>
        </div>
        <p style={{ color: "#9ca3af", fontSize: 13 }}>Bazar Mayorista · Villa Lugano, CABA</p>
        <p style={{ color: "#6b7280", fontSize: 12, marginTop: 4 }}>💳 Transferencia: <span style={{ color: "#fbbf24", fontWeight: 800 }}>ELRAYO.LUGANO</span></p>
      </footer>
    </div>
  );
}
