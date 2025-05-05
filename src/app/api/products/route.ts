import { NextResponse } from "next/server";
import { connectToDb } from "../db";

export async function GET() {
  const { db } = await connectToDb();

  const products = await db.collection('products').find({}).toArray();

  if (!products) {
    return NextResponse.json({ data: [], message: "No products found." }, { status: 200 });
  }

  return NextResponse.json({ data: products, message: "Products found." }, { status: 200 });
}