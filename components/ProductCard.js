export default function ProductCard({ product, locale, t }) {
  const name = locale === "en" ? product.nameEn : product.nameFr;

  return (
    <article className="card">
      <div className="card-media">{product.emoji}</div>
      <div className="card-body">
        <strong>{name}</strong>
        <div className="price">{product.price.toFixed(2).replace(".", ",")} €</div>
        <button className="btn" type="button">{t.addToCart}</button>
      </div>
    </article>
  );
}
