import { connectToDb } from "@/app/api/db";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";
import jwt from 'jsonwebtoken';

type Params = {
    verificationString: string
}

export async function PUT(request: Request, { params }: { params: Promise<Params> }) {

    const { verificationString } = await params;

    try {
        const { db } = await connectToDb();

        const result = await db.collection('users').findOne({ verificationString });

        if (!result) {
            return NextResponse.json({
                data: null,
                message: "The email verification code is invalid.",
            }, { status: 500 });
        }

        const { _id, email } = result;

        await db.collection('users').updateOne({ _id: new ObjectId(_id) }, {
            $set: {
                isVerified: true,
                verificationString: null,
            }
        });

        const jwtSecret = process.env.JWT_SECRET;

        if (!jwtSecret) {
            throw new Error("JWT secret not defined as an envrionment variable.");
        }

        const token = jwt.sign({
            _id,
            email,
            isVerified: true,
        }, jwtSecret, { expiresIn: '2d' });

        return NextResponse.json({
            data: {
                user: {
                    _id,
                    email,
                    isVerified: true,
                },
                token
            },
            message: "Email verified successfully."
        }, { status: 200 });

    } catch (error) {
        return NextResponse.json({ data: null, message: "Internal server error: " + error }, { status: 500 })
    }
}