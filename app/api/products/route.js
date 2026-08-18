import { NextResponse } from "next/server";
import { getProducts } from "../../../lib/productRepository";

export const dynamic = "force-dynamic";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category") || undefined;
    const featuredParam = searchParams.get("featured");
    const featured =
      featuredParam === null ? undefined : featuredParam === "true";

    const products = await getProducts({ category, featured });

    return NextResponse.json({ products });
  } catch (error) {
    console.error("GET /api/products", error);
    return NextResponse.json(
      { error: "Unable to load products" },
      { status: 500 }
    );
  }
}
