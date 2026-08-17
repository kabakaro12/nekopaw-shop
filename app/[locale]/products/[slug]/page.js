import { notFound } from "next/navigation";
import Header from "../../../../components/Header";
import AddToCartButton from "../../../../components/AddToCartButton";
import { getDictionary } from "../../../../lib/i18n";
import { products } from "../../../../lib/products";

export function generateStaticParams() {
  return products.flatMap(product => [
    { locale: "fr", slug: product.slug },
    { locale: "en", slug: product.slug },
  ]);
}

export default async function ProductPage({ params }) {
  const { locale, slug } = await params;
  const product = products.find(item => item.slug === slug);

  if (!product) notFound();

  const t = getDictionary(locale);
  const fr = locale !== "en";
  const name = fr ? product.nameFr : product.nameEn;
  const description = fr ? product.descriptionFr : product.descriptionEn;

  return (
    <>
      <Header locale={locale} t={t} />

      <main className="container section">
        <div className="product-page">
          <div className="product-visual">{product.emoji}</div>

          <div className="product-info">
            <span className="eyebrow">
              {product.category === "dogs"
                ? fr ? "Univers Chiens" : "Dogs"
                : fr ? "Univers Chats" : "Cats"}
            </span>

            <h1>{name}</h1>
            <div className="product-rating">★★★★★ <span>4,8/5</span></div>
            <div className="product-price">
              {product.price.toFixed(2).replace(".", ",")} €
            </div>

            <p className="product-description">{description}</p>

            <ul className="product-benefits">
              <li>✓ {fr ? "Paiement sécurisé" : "Secure payment"}</li>
              <li>✓ {fr ? "Livraison suivie" : "Tracked shipping"}</li>
              <li>✓ {fr ? "Retour sous 30 jours" : "30-day returns"}</li>
            </ul>

            <AddToCartButton product={product} locale={locale} />
          </div>
        </div>
      </main>
    </>
  );
}
