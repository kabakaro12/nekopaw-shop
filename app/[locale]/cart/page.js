import Header from "../../../components/Header";
import CartPageClient from "../../../components/CartPageClient";
import { getDictionary } from "../../../lib/i18n";

export default async function CartPage({ params }) {
  const { locale } = await params;
  const t = getDictionary(locale);
  const title = locale === "en" ? "Your cart" : "Votre panier";

  return (
    <>
      <Header locale={locale} t={t} />
      <main className="container section">
        <h1>{title}</h1>
        <CartPageClient locale={locale} />
      </main>
    </>
  );
}
