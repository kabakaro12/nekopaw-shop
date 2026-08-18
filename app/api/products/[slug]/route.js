import { NextResponse } from "next/server";
import { getProductBySlug } from "../../../../lib/productRepository";

export const dynamic = "force-dynamic";

export async function GET(_request, { params }) {
  try {
    const { slug } = await params;
    const product = await getProductBySlug(slug);

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json({ product });
  } catch (error) {
    console.error("GET /api/products/[slug]", error);
    return NextResponse.json(
      { error: "Unable to load product" },
      { status: 500 }
    );
  }
}
