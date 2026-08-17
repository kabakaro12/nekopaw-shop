export const dictionaries = {
  fr: {
    home: "Accueil",
    dogs: "Chiens",
    cats: "Chats",
    new: "Nouveautés",
    promotions: "Promotions",
    track: "Suivi de commande",
    contact: "Contact",
    heroTitle: "Le meilleur pour vos compagnons à quatre pattes",
    heroText: "Des accessoires pratiques, confortables et stylés pour chiens et chats.",
    shopNow: "Découvrir la boutique",
    seeNew: "Voir les nouveautés",
    bestSellers: "Nos meilleures ventes",
    addToCart: "Ajouter au panier",
    language: "English",
  },
  en: {
    home: "Home",
    dogs: "Dogs",
    cats: "Cats",
    new: "New arrivals",
    promotions: "Promotions",
    track: "Track order",
    contact: "Contact",
    heroTitle: "The best for your four-legged companions",
    heroText: "Practical, comfortable and stylish accessories for cats and dogs.",
    shopNow: "Shop now",
    seeNew: "See new arrivals",
    bestSellers: "Best sellers",
    addToCart: "Add to cart",
    language: "Français",
  },
};

export function getDictionary(locale) {
  return dictionaries[locale] || dictionaries.fr;
}
