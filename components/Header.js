import Link from "next/link";

export default function Header({ locale, t }) {
  const otherLocale = locale === "fr" ? "en" : "fr";

  return (
    <header className="header">
      <div className="container header-inner">
        <Link href={`/${locale}`} className="logo">🐾 NekoPaw Shop</Link>

        <nav className="nav">
          <Link href={`/${locale}`}>{t.home}</Link>
          <Link href={`/${locale}/products?category=dogs`}>{t.dogs}</Link>
          <Link href={`/${locale}/products?category=cats`}>{t.cats}</Link>
          <Link href={`/${locale}/products`}>{t.new}</Link>
          <Link href={`/${locale}/products?promo=1`}>{t.promotions}</Link>
          <Link href={`/${locale}/account`}>{t.track}</Link>
          <Link href={`/${locale}#contact`}>{t.contact}</Link>
        </nav>

        <Link href={`/${otherLocale}`} className="btn secondary">{t.language}</Link>
      </div>
    </header>
  );
}
