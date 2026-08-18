# NekoPaw Shop — V3 backend produits

Cette mise à jour connecte le catalogue à PostgreSQL.

## 1. Configurer PostgreSQL

Créer une base `nekopaw`, puis exécuter :

```bash
psql "$DATABASE_URL" -f db/schema.sql
psql "$DATABASE_URL" -f db/seed.sql
```

## 2. Variables d'environnement

Copier `.env.example` vers `.env.local` et renseigner :

```env
DATABASE_URL=postgresql://USER:PASSWORD@HOST:5432/nekopaw
```

## 3. Tester

```bash
npm install
npm run dev
```

Endpoints :

- `GET /api/health`
- `GET /api/products`
- `GET /api/products?category=dogs`
- `GET /api/products?category=cats`
- `GET /api/products?featured=true`
- `GET /api/products/no-pull-harness`

La page d'accueil, le catalogue et les fiches produits lisent maintenant PostgreSQL.

## Étape suivante

V3.1 :
- authentification client ;
- panier en base ;
- création de commande ;
- API admin sécurisée.
