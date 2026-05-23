import "./globals.css";
import { CartProvider } from "./context/CartContext";

export const metadata = {
  title: "El Rayo - Bazar Mayorista | Villa Lugano",
  description: "Catálogo mayorista El Rayo, Villa Lugano.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}
