import { NextRequest, NextResponse } from "next/server";
import { connectToDb } from "../../../db";

type Params = {
  categoryName: string;
}

export async function GET(request: NextRequest, { params }: { params: Promise<Params> }) {

  const { db } = await connectToDb();

  const { categoryName } = await params;

  const validCategories = ["shoes", "boots", "athletic"];

  if (!validCategories.includes(categoryName.toLocaleLowerCase())) {
    return NextResponse.json({ data: null, message: "Category does not exist." }, { status: 404 });
  }

  const products = await db.collection('products').find({ category: categoryName.toLowerCase() }).toArray();

  return NextResponse.json({ data: products, message: "Products found." }, { status: 200 });
}