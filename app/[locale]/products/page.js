import Header from "../../../components/Header";
import ProductCard from "../../../components/ProductCard";
import { getDictionary } from "../../../lib/i18n";
import { getProducts } from "../../../lib/productRepository";

export const dynamic = "force-dynamic";

export default async function ProductsPage({ params, searchParams }) {
  const { locale } = await params;
  const filters = await searchParams;
  const t = getDictionary(locale);

  const category = filters?.category;
  const products = await getProducts({ category });

  const title =
    locale === "en"
      ? category === "dogs"
        ? "Dog accessories"
        : category === "cats"
          ? "Cat accessories"
          : "All products"
      : category === "dogs"
        ? "Accessoires pour chiens"
        : category === "cats"
          ? "Accessoires pour chats"
          : "Tous les produits";

  return (
    <>
      <Header locale={locale} t={t} />
      <main className="container section">
        <div className="catalog-heading">
          <div>
            <span className="eyebrow">NekoPaw Shop</span>
            <h1>{title}</h1>
          </div>
          <span className="catalog-count">{products.length} produits / products</span>
        </div>

        <div className="grid">
          {products.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              locale={locale}
            />
          ))}
        </div>
      </main>
    </>
  );
}
