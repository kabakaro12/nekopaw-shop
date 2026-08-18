"use client";

import Link from "next/link";
import { useCart } from "./CartProvider";

function money(value) {
  return `${value.toFixed(2).replace(".", ",")} €`;
}

export default function CartPageClient({ locale = "fr" }) {
  const {
    items,
    updateQuantity,
    removeItem,
    clearCart,
    subtotal,
    ready,
  } = useCart();

  const fr = locale !== "en";

  if (!ready) {
    return <p>{fr ? "Chargement du panier…" : "Loading cart…"}</p>;
  }

  if (!items.length) {
    return (
      <div className="empty-cart">
        <div className="empty-cart-icon">🛒</div>
        <h2>{fr ? "Votre panier est vide" : "Your cart is empty"}</h2>
        <p>
          {fr
            ? "Découvrez nos accessoires pour chiens et chats."
            : "Discover our accessories for cats and dogs."}
        </p>
        <Link className="btn" href={`/${locale}/products`}>
          {fr ? "Découvrir les produits" : "Browse products"}
        </Link>
      </div>
    );
  }

  return (
    <div className="cart-layout">
      <section className="cart-items">
        {items.map(item => {
          const name = locale === "en" ? item.nameEn : item.nameFr;

          return (
            <article className="cart-item" key={item.id}>
              <div className="cart-item-media">{item.emoji}</div>

              <div className="cart-item-info">
                <Link href={`/${locale}/products/${item.slug}`}>
                  <strong>{name}</strong>
                </Link>
                <span>{money(item.price)}</span>

                <div className="quantity-row">
                  <button
                    type="button"
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    aria-label={fr ? "Diminuer la quantité" : "Decrease quantity"}
                  >
                    −
                  </button>

                  <strong>{item.quantity}</strong>

                  <button
                    type="button"
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    aria-label={fr ? "Augmenter la quantité" : "Increase quantity"}
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="cart-item-total">
                <strong>{money(item.price * item.quantity)}</strong>
                <button
                  className="remove-link"
                  type="button"
                  onClick={() => removeItem(item.id)}
                >
                  {fr ? "Supprimer" : "Remove"}
                </button>
              </div>
            </article>
          );
        })}

        <button className="clear-cart" type="button" onClick={clearCart}>
          {fr ? "Vider le panier" : "Clear cart"}
        </button>
      </section>

      <aside className="cart-summary">
        <h2>{fr ? "Récapitulatif" : "Order summary"}</h2>

        <div className="summary-line">
          <span>{fr ? "Sous-total" : "Subtotal"}</span>
          <strong>{money(subtotal)}</strong>
        </div>

        <div className="summary-line">
          <span>{fr ? "Livraison" : "Shipping"}</span>
          <span>{fr ? "Calculée au paiement" : "Calculated at checkout"}</span>
        </div>

        <div className="summary-total">
          <span>Total</span>
          <strong>{money(subtotal)}</strong>
        </div>

        <Link href={`/${locale}/checkout`} className="btn checkout-btn">
          {fr ? "Passer au paiement" : "Proceed to checkout"}
        </Link>

        <Link href={`/${locale}/products`} className="continue-shopping">
          ← {fr ? "Continuer mes achats" : "Continue shopping"}
        </Link>
      </aside>
    </div>
  );
}
