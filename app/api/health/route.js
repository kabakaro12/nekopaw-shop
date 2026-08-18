import { NextResponse } from "next/server";
import pool from "../../../lib/db";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const result = await pool.query("SELECT NOW() AS database_time");
    return NextResponse.json({
      status: "ok",
      database: "connected",
      databaseTime: result.rows[0].database_time,
    });
  } catch (error) {
    console.error("GET /api/health", error);
    return NextResponse.json(
      { status: "error", database: "disconnected" },
      { status: 503 }
    );
  }
}
