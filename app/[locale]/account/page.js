import Header from "../../components/Header";
import ProductCard from "../../components/ProductCard";
import { getDictionary } from "../../lib/i18n";
import { getProducts } from "../../lib/productRepository";

export const dynamic = "force-dynamic";

export default async function HomePage({ params }) {
  const { locale } = await params;
  const t = getDictionary(locale);
  const products = await getProducts({ featured: true });

  return (
    <>
      <Header locale={locale} t={t} />

      <main>
        <section className="hero">
          <div className="container">
            <div className="hero-card">
              <div>
                <h1>{t.heroTitle}</h1>
                <p>{t.heroText}</p>
                <div className="actions">
                  <a className="btn" href={`/${locale}/products`}>{t.shopNow}</a>
                  <a className="btn secondary" href={`/${locale}/products`}>{t.seeNew}</a>
                </div>
              </div>
              <div className="placeholder-pet" aria-label="Cat and dog image placeholder">🐶 🐱</div>
            </div>
          </div>
        </section>

        <section className="section">
          <div className="container">
            <h2>{t.bestSellers}</h2>
            <div className="grid">
              {products.map(product => (
                <ProductCard key={product.id} product={product} locale={locale} t={t} />
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="footer" id="contact">
        <div className="container">
          © 2026 NekoPaw Shop · contact@nekopawshop.fr
        </div>
      </footer>
    </>
  );
}
