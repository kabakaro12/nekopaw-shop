"use client";

import Link from "next/link";
import { useCart } from "./CartProvider";

export default function CartLink({ locale = "fr" }) {
  const { itemCount } = useCart();
  const label = locale === "en" ? "Cart" : "Panier";

  return (
    <Link href={`/${locale}/cart`} className="cart-link" aria-label={label}>
      🛒 <span>{label}</span>
      <strong className="cart-count">{itemCount}</strong>
    </Link>
  );
}
