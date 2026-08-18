import pool from "./db";

function fallbackEmoji(category) {
  return category === "cats" ? "🐱" : "🐶";
}

function mapProduct(row) {
  return {
    id: row.product_id,
    slug: row.slug,
    category: row.category,
    nameFr: row.name_fr,
    nameEn: row.name_en,
    descriptionFr: row.description_fr || "",
    descriptionEn: row.description_en || "",
    price: Number(row.promotional_price ?? row.sale_price),
    regularPrice: Number(row.sale_price),
    stock: Number(row.displayed_stock ?? 0),
    featured: Boolean(row.is_featured),
    emoji: fallbackEmoji(row.category),
    images: row.images || [],
  };
}

export async function getProducts({ category, featured } = {}) {
  const values = [];
  const where = ["p.is_active = TRUE"];

  if (category) {
    values.push(category);
    where.push(`p.category = $${values.length}`);
  }

  if (typeof featured === "boolean") {
    values.push(featured);
    where.push(`p.is_featured = $${values.length}`);
  }

  const result = await pool.query(
    `SELECT
       p.*,
       COALESCE(
         json_agg(
           json_build_object(
             'url', pi.image_url,
             'altFr', pi.alt_text_fr,
             'altEn', pi.alt_text_en,
             'position', pi.position
           ) ORDER BY pi.position
         ) FILTER (WHERE pi.image_id IS NOT NULL),
         '[]'::json
       ) AS images
     FROM products p
     LEFT JOIN product_images pi ON pi.product_id = p.product_id
     WHERE ${where.join(" AND ")}
     GROUP BY p.product_id
     ORDER BY p.is_featured DESC, p.created_at DESC`,
    values
  );

  return result.rows.map(mapProduct);
}

export async function getProductBySlug(slug) {
  const result = await pool.query(
    `SELECT
       p.*,
       COALESCE(
         json_agg(
           json_build_object(
             'url', pi.image_url,
             'altFr', pi.alt_text_fr,
             'altEn', pi.alt_text_en,
             'position', pi.position
           ) ORDER BY pi.position
         ) FILTER (WHERE pi.image_id IS NOT NULL),
         '[]'::json
       ) AS images
     FROM products p
     LEFT JOIN product_images pi ON pi.product_id = p.product_id
     WHERE p.slug = $1 AND p.is_active = TRUE
     GROUP BY p.product_id
     LIMIT 1`,
    [slug]
  );

  return result.rows[0] ? mapProduct(result.rows[0]) : null;
}
