import "./globals.css";

export const metadata = {
  title: "NekoPaw Shop",
  description: "Accessories for happy cats and dogs.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}
