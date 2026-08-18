import { CartProvider } from "../../components/CartProvider";

export function generateStaticParams() {
  return [{ locale: "fr" }, { locale: "en" }];
}

export default function LocaleLayout({ children }) {
  return <CartProvider>{children}</CartProvider>;
}
