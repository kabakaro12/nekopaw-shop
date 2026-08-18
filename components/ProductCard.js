import Link from "next/link";
import AddToCartButton from "./AddToCartButton";

export default function ProductCard({ product, locale }) {
  const name = locale === "en" ? product.nameEn : product.nameFr;
  const detailsLabel = locale === "en" ? "View details" : "Voir le produit";

  return (
    <article className="card">
      <Link href={`/${locale}/products/${product.slug}`} className="card-product-link">
        <div className="card-media">{product.emoji}</div>
        <div className="card-body">
          <strong>{name}</strong>
          <div className="price">{product.price.toFixed(2).replace(".", ",")} €</div>
          <span className="product-details-link">{detailsLabel} →</span>
        </div>
      </Link>

      <div className="card-action">
        <AddToCartButton product={product} locale={locale} />
      </div>
    </article>
  );
}
