-- NekoPaw Shop starter catalog
-- Run AFTER db/schema.sql.

INSERT INTO products
(name_fr, name_en, slug, description_fr, description_en, category, sale_price, promotional_price, displayed_stock, is_active, is_featured)
VALUES
('Harnais anti-traction', 'No-pull harness', 'no-pull-harness',
 'Un harnais confortable pensé pour mieux répartir la pression et rendre les promenades plus agréables.',
 'A comfortable harness designed to distribute pressure and make walks more enjoyable.',
 'dogs', 29.90, NULL, 40, TRUE, TRUE),

('Laisse rétractable 5 m', '5 m retractable leash', 'retractable-leash',
 'Une laisse pratique pour offrir plus de liberté à votre chien tout en gardant le contrôle.',
 'A practical leash that gives your dog more freedom while keeping you in control.',
 'dogs', 19.90, NULL, 50, TRUE, TRUE),

('Gourde portable 2-en-1', '2-in-1 portable water bottle', 'portable-water-bottle',
 'Une gourde compacte pour hydrater facilement votre compagnon pendant les promenades et voyages.',
 'A compact bottle that makes hydration easy during walks and trips.',
 'dogs', 16.90, NULL, 60, TRUE, FALSE),

('Tapis de léchage anti-stress', 'Anti-stress lick mat', 'lick-mat',
 'Un tapis texturé conçu pour occuper votre chien et ralentir la prise de nourriture.',
 'A textured mat designed to keep your dog occupied and slow down feeding.',
 'dogs', 12.90, NULL, 75, TRUE, FALSE),

('Fontaine à eau silencieuse', 'Quiet water fountain', 'water-fountain',
 'Une fontaine pensée pour encourager votre chat à boire régulièrement avec un fonctionnement discret.',
 'A quiet fountain designed to encourage your cat to drink more regularly.',
 'cats', 34.90, NULL, 30, TRUE, TRUE),

('Jouet interactif', 'Interactive toy', 'interactive-toy',
 'Un jouet stimulant pour divertir les chats et encourager leur activité quotidienne.',
 'A stimulating toy designed to entertain cats and encourage daily activity.',
 'cats', 18.90, NULL, 55, TRUE, TRUE),

('Hamac de fenêtre', 'Window hammock', 'window-hammock',
 'Un espace confortable en hauteur pour permettre à votre chat de se reposer et observer l''extérieur.',
 'A comfortable elevated resting spot where your cat can relax and watch the world outside.',
 'cats', 24.90, NULL, 35, TRUE, FALSE),

('Brosse anti-poils', 'Pet grooming brush', 'pet-brush',
 'Une brosse pratique pour retirer les poils morts et entretenir le pelage en douceur.',
 'A practical grooming brush for removing loose fur and maintaining a healthy coat.',
 'cats', 13.90, NULL, 80, TRUE, FALSE)
ON CONFLICT (slug) DO NOTHING;
