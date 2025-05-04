import { NextRequest, NextResponse } from "next/server";
import { connectToDb } from "../../db";
import { ObjectId } from "mongodb";

type Params = {
    _id: string;
}

export async function GET(request: NextRequest, { params }: { params: Promise<Params> }) {

    const { db } = await connectToDb();

    const { _id: userId } = await params;

    const product = await db.collection('products').findOne({ _id: new ObjectId(userId) });

    if (!product) {
        return NextResponse.json({ data: null, message: "Product not found." }, { status: 400 });
    }

    return NextResponse.json({ data: product, message: "Product found." }, { status: 200 });
}