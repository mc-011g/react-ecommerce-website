import { NextRequest, NextResponse } from "next/server";
import { connectToDb } from "../../db";

export async function GET(request: NextRequest) {
  const { db } = await connectToDb();

  const { searchParams } = new URL(request.url);

  const searchQuery = searchParams.get("search");

  if (!searchQuery) {
    return NextResponse.json({ data: null, message: "Search query is required." }, { status: 400 });
  }

  const query: Record<string, unknown> = {};

  query.name = { $regex: searchQuery, $options: "i" }; // Case-insensitive search  

  const products = await db
    .collection('products')
    .find({ name: { $regex: searchQuery, $options: "i" } })
    .toArray();

  return NextResponse.json({ data: products, message: "Products found from search request." }, { status: 200 });
}