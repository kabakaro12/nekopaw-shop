"use client";

import { useState } from "react";
import { useCart } from "./CartProvider";

export default function AddToCartButton({ product, locale = "fr" }) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  const label = locale === "en" ? "Add to cart" : "Ajouter au panier";
  const addedLabel = locale === "en" ? "Added ✓" : "Ajouté ✓";

  function handleAdd() {
    addItem({
      id: product.id,
      slug: product.slug,
      emoji: product.emoji,
      nameFr: product.nameFr,
      nameEn: product.nameEn,
      price: product.price,
    });

    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
  }

  return (
    <button className="btn" type="button" onClick={handleAdd}>
      {added ? addedLabel : label}
    </button>
  );
}
