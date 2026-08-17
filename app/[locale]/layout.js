export function generateStaticParams() {
  return [{ locale: "fr" }, { locale: "en" }];
}

export default function LocaleLayout({ children }) {
  return children;
}
