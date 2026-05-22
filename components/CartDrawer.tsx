"use client";
import { useState } from "react";
import { useCart } from "../app/context/CartContext";

interface CartDrawerProps { open: boolean; onClose: () => void; }
interface OrderForm { nombre: string; telefono: string; calle: string; numero: string; piso: string; barrio: string; localidad: string; notas: string; }
type Step = "cart" | "form" | "confirmation";

export default function CartDrawer({ open, onClose }: CartDrawerProps) {
  const { items, removeFromCart, updateQuantity, clearCart, totalPrice, totalItems } = useCart();
  const [step, setStep] = useState<Step>("cart");
  const [form, setForm] = useState<OrderForm>({ nombre: "", telefono: "", calle: "", numero: "", piso: "", barrio: "", localidad: "", notas: "" });
  const [errors, setErrors] = useState<Partial<OrderForm>>({});

  const fmt = (n: number) => new Intl.NumberFormat("es-AR", { style: "currency", currency: "ARS", minimumFractionDigits: 0 }).format(n);

  const validate = () => {
    const e: Partial<OrderForm> = {};
    if (!form.nombre.trim()) e.nombre = "Requerido";
    if (!form.telefono.trim()) e.telefono = "Requerido";
    if (!form.calle.trim()) e.calle = "Requerido";
    if (!form.numero.trim()) e.numero = "Requerido";
    if (!form.localidad.trim()) e.localidad = "Requerido";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleWhatsApp = () => {
    const itemsList = items.map((i) => `• ${i.product.name} x${i.quantity} (${fmt(i.product.price * i.quantity)})`).join("\n");
    const addr = [form.calle, form.numero, form.piso, form.barrio, form.localidad].filter(Boolean).join(", ");
    const msg = encodeURIComponent(`🛒 *NUEVO PEDIDO - EL RAYO*\n\n👤 *Cliente:* ${form.nombre}\n📞 *Teléfono:* ${form.telefono}\n📍 *Dirección:* ${addr}\n${form.notas ? `📝 *Notas:* ${form.notas}\n` : ""}\n*PRODUCTOS:*\n${itemsList}\n\n💰 *TOTAL: ${fmt(totalPrice)}*\n\n💳 *Pago:* Transferencia al alias *ELRAYO.LUGANO*`);
    window.open(`https://wa.me/5491100000000?text=${msg}`, "_blank");
    clearCart(); onClose(); setStep("cart");
    setForm({ nombre: "", telefono: "", calle: "", numero: "", piso: "", barrio: "", localidad: "", notas: "" });
  };

  if (!open) return null;

  const drawerStyle: React.CSSProperties = { position: "fixed", right: 0, top: 0, height: "100%", width: 360, maxWidth: "100vw", background: "white", zIndex: 201, display: "flex", flexDirection: "column", boxShadow: "-4px 0 24px rgba(0,0,0,0.2)" };
  const overlayStyle: React.CSSProperties = { position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", zIndex: 200 };
  const hdrStyle: React.CSSProperties = { background: "linear-gradient(135deg, #1a0800, #E8200A, #F56200)", padding: "12px 16px", display: "flex", justifyContent: "space-between", alignItems: "center", flexShrink: 0 };
  const bodyStyle: React.CSSProperties = { flex: 1, overflowY: "auto", padding: 12 };
  const footStyle: React.CSSProperties = { padding: 12, borderTop: "1px solid #fed7aa", flexShrink: 0 };

  return (
    <>
      <div style={overlayStyle} onClick={onClose} />
      <div style={drawerStyle}>
        <div style={hdrStyle}>
          <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", color: "white", fontSize: 20, letterSpacing: "0.05em" }}>
            {step === "cart" && "🛒 MI PEDIDO"}{step === "form" && "📍 DATOS DE ENVÍO"}{step === "confirmation" && "✅ CONFIRMAR PEDIDO"}
          </h2>
          <button onClick={onClose} style={{ background: "none", border: "none", color: "white", fontSize: 22, cursor: "pointer" }}>✕</button>
        </div>

        {step === "cart" && (
          <>
            <div style={bodyStyle}>
              {items.length === 0 ? (
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100%", gap: 8, color: "#d1d5db", padding: 40 }}>
                  <span style={{ fontSize: 56 }}>🛒</span>
                  <p style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 22 }}>CARRITO VACÍO</p>
                  <p style={{ fontSize: 13 }}>¡Agregá productos para empezar!</p>
                </div>
              ) : items.map((item) => (
                <div key={item.product.id} style={{ display: "flex", gap: 10, background: "#fff7ed", borderRadius: 12, padding: 10, marginBottom: 8 }}>
                  <div style={{ width: 44, height: 44, background: "white", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, flexShrink: 0 }}>{item.product.emoji}</div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ fontWeight: 700, fontSize: 13, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{item.product.name}</p>
                    <p style={{ color: "#E8200A", fontWeight: 800, fontSize: 13 }}>{fmt(item.product.price * item.quantity)}</p>
                    <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 4 }}>
                      <button onClick={() => updateQuantity(item.product.id, item.quantity - 1)} style={{ width: 22, height: 22, borderRadius: 6, border: "1px solid #fed7aa", background: "white", color: "#ea580c", fontWeight: 800, cursor: "pointer", fontSize: 14 }}>−</button>
                      <span style={{ fontWeight: 800, fontSize: 13, minWidth: 18, textAlign: "center" }}>{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.product.id, item.quantity + 1)} style={{ width: 22, height: 22, borderRadius: 6, border: "1px solid #fed7aa", background: "white", color: "#ea580c", fontWeight: 800, cursor: "pointer", fontSize: 14 }}>+</button>
                    </div>
                  </div>
                  <button onClick={() => removeFromCart(item.product.id)} style={{ background: "none", border: "none", fontSize: 16, cursor: "pointer", opacity: 0.5, alignSelf: "flex-start" }}>🗑️</button>
                </div>
              ))}
            </div>
            {items.length > 0 && (
              <div style={footStyle}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                  <span style={{ fontWeight: 700, color: "#6b7280", fontSize: 14 }}>{totalItems} productos</span>
                  <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 26, color: "#E8200A" }}>{fmt(totalPrice)}</span>
                </div>
                <button onClick={() => setStep("form")} style={{ width: "100%", padding: 12, borderRadius: 12, background: "linear-gradient(135deg, #E8200A, #F56200)", color: "white", border: "none", fontFamily: "'Bebas Neue', sans-serif", fontSize: 18, letterSpacing: "0.05em", cursor: "pointer" }}>CONTINUAR →</button>
              </div>
            )}
          </>
        )}

        {step === "form" && (
          <>
            <div style={bodyStyle}>
              {[
                { label: "Nombre y apellido *", key: "nombre", placeholder: "Juan García" },
                { label: "Teléfono / WhatsApp *", key: "telefono", placeholder: "11 2345-6789" },
              ].map(({ label, key, placeholder }) => (
                <div key={key} style={{ marginBottom: 10 }}>
                  <label style={{ display: "block", fontSize: 11, fontWeight: 800, color: "#6b7280", textTransform: "uppercase" as const, letterSpacing: "0.06em", marginBottom: 3 }}>{label}</label>
                  <input value={form[key as keyof OrderForm]} onChange={(e) => setForm({ ...form, [key]: e.target.value })} placeholder={placeholder}
                    style={{ width: "100%", border: `1.5px solid ${errors[key as keyof OrderForm] ? "#ef4444" : "#e5e7eb"}`, borderRadius: 8, padding: "8px 10px", fontSize: 13, fontFamily: "'Nunito', sans-serif", outline: "none" }} />
                  {errors[key as keyof OrderForm] && <p style={{ color: "#ef4444", fontSize: 11, marginTop: 2 }}>{errors[key as keyof OrderForm]}</p>}
                </div>
              ))}
              <hr className="flame-divider" style={{ margin: "12px 0" }} />
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                {[{ label: "Calle *", key: "calle", placeholder: "Av. Larrazábal" }, { label: "Número *", key: "numero", placeholder: "1234" }, { label: "Piso/Depto", key: "piso", placeholder: "3° B" }, { label: "Barrio", key: "barrio", placeholder: "Villa Lugano" }].map(({ label, key, placeholder }) => (
                  <div key={key}>
                    <label style={{ display: "block", fontSize: 11, fontWeight: 800, color: "#6b7280", textTransform: "uppercase" as const, letterSpacing: "0.06em", marginBottom: 3 }}>{label}</label>
                    <input value={form[key as keyof OrderForm]} onChange={(e) => setForm({ ...form, [key]: e.target.value })} placeholder={placeholder}
                      style={{ width: "100%", border: `1.5px solid ${errors[key as keyof OrderForm] ? "#ef4444" : "#e5e7eb"}`, borderRadius: 8, padding: "8px 10px", fontSize: 13, outline: "none" }} />
                  </div>
                ))}
              </div>
              <div style={{ marginTop: 8, marginBottom: 8 }}>
                <label style={{ display: "block", fontSize: 11, fontWeight: 800, color: "#6b7280", textTransform: "uppercase" as const, letterSpacing: "0.06em", marginBottom: 3 }}>Localidad *</label>
                <input value={form.localidad} onChange={(e) => setForm({ ...form, localidad: e.target.value })} placeholder="CABA / GBA..."
                  style={{ width: "100%", border: `1.5px solid ${errors.localidad ? "#ef4444" : "#e5e7eb"}`, borderRadius: 8, padding: "8px 10px", fontSize: 13, outline: "none" }} />
              </div>
              <div>
                <label style={{ display: "block", fontSize: 11, fontWeight: 800, color: "#6b7280", textTransform: "uppercase" as const, letterSpacing: "0.06em", marginBottom: 3 }}>Notas</label>
                <textarea value={form.notas} onChange={(e) => setForm({ ...form, notas: e.target.value })} placeholder="Horario de entrega, referencias..." rows={2}
                  style={{ width: "100%", border: "1.5px solid #e5e7eb", borderRadius: 8, padding: "8px 10px", fontSize: 13, resize: "none", outline: "none" }} />
              </div>
            </div>
            <div style={footStyle}>
              <button onClick={() => { if (validate()) setStep("confirmation"); }} style={{ width: "100%", padding: 12, borderRadius: 12, background: "linear-gradient(135deg, #E8200A, #F56200)", color: "white", border: "none", fontFamily: "'Bebas Neue', sans-serif", fontSize: 18, letterSpacing: "0.05em", cursor: "pointer", marginBottom: 6 }}>VER RESUMEN →</button>
              <button onClick={() => setStep("cart")} style={{ width: "100%", padding: 6, background: "none", border: "none", color: "#9ca3af", fontSize: 13, cursor: "pointer" }}>← Volver al carrito</button>
            </div>
          </>
        )}

        {step === "confirmation" && (
          <>
            <div style={bodyStyle}>
              <div style={{ background: "#fff7ed", borderRadius: 12, padding: 12, marginBottom: 10 }}>
                <h3 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 15, marginBottom: 8 }}>RESUMEN DEL PEDIDO</h3>
                {items.map((i) => (
                  <div key={i.product.id} style={{ display: "flex", justifyContent: "space-between", fontSize: 12, padding: "2px 0", color: "#374151" }}>
                    <span>{i.product.emoji} {i.product.name} x{i.quantity}</span>
                    <span>{fmt(i.product.price * i.quantity)}</span>
                  </div>
                ))}
                <div style={{ display: "flex", justifyContent: "space-between", marginTop: 8, paddingTop: 8, borderTop: "1px solid #fed7aa" }}>
                  <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 16 }}>TOTAL</span>
                  <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 20, color: "#E8200A" }}>{fmt(totalPrice)}</span>
                </div>
              </div>
              <div style={{ background: "#eff6ff", borderRadius: 12, padding: 12, marginBottom: 10 }}>
                <h3 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 15, marginBottom: 8 }}>📍 ENVÍO A</h3>
                <p style={{ fontWeight: 700, fontSize: 14 }}>{form.nombre}</p>
                <p style={{ fontSize: 13, color: "#374151", marginTop: 2 }}>{[form.calle, form.numero, form.piso, form.barrio, form.localidad].filter(Boolean).join(", ")}</p>
                <p style={{ fontSize: 13, color: "#374151" }}>📞 {form.telefono}</p>
              </div>
              <div style={{ background: "#f0fdf4", border: "1px solid #bbf7d0", borderRadius: 12, padding: 12 }}>
                <h3 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 15, marginBottom: 8 }}>💳 FORMA DE PAGO</h3>
                <p style={{ fontSize: 13, color: "#374151", marginBottom: 6 }}>Transferencia bancaria / Mercado Pago</p>
                <div style={{ background: "white", border: "1px solid #bbf7d0", borderRadius: 8, padding: "8px 12px" }}>
                  <p style={{ fontSize: 10, textTransform: "uppercase" as const, fontWeight: 800, color: "#9ca3af", letterSpacing: "0.08em" }}>Alias</p>
                  <p style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 22, color: "#16a34a", letterSpacing: "0.08em" }}>ELRAYO.LUGANO</p>
                </div>
                <p style={{ fontSize: 11, color: "#9ca3af", marginTop: 6 }}>* Envianos el comprobante por WhatsApp para confirmar tu pedido.</p>
              </div>
            </div>
            <div style={footStyle}>
              <button onClick={handleWhatsApp} style={{ width: "100%", padding: 12, borderRadius: 12, background: "#22c55e", color: "white", border: "none", fontFamily: "'Bebas Neue', sans-serif", fontSize: 18, letterSpacing: "0.05em", cursor: "pointer", marginBottom: 6 }}>📲 CONFIRMAR POR WHATSAPP</button>
              <button onClick={() => setStep("form")} style={{ width: "100%", padding: 6, background: "none", border: "none", color: "#9ca3af", fontSize: 13, cursor: "pointer" }}>← Modificar datos</button>
            </div>
          </>
        )}
      </div>
    </>
  );
}
