import Header from "../../../components/Header";
import { getDictionary } from "../../../lib/i18n";

export default async function Page({ params }) {
  const { locale } = await params;
  const t = getDictionary(locale);
  return (
    <>
      <Header locale={locale} t={t} />
      <main className="container section">
        <h1>Panier / Cart</h1>
        <p>Cette page sera développée dans la prochaine étape.</p>
      </main>
    </>
  );
}
