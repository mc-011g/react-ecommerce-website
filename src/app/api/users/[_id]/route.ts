import { NextResponse } from "next/server";
import { connectToDb } from "../../db";
import jwt from 'jsonwebtoken';
import { ObjectId } from "mongodb";
import { saveUserProfileSchema } from "@/util/saveUserProfileSchema";
import { NewUser } from "@/types/types";

type Params = {
    _id: string;
}

export async function GET(request: Request, { params }: { params: Promise<Params> }) {

    const authHeader = request.headers.get('Authorization');
    const token = authHeader?.split(' ')[1]; // Extract the token

    const { _id: userId } = await params;

    if (!token) {
        return NextResponse.json({ data: null, message: "Unauthorized" }, { status: 401 });
    }

    try {
        const jwtSecret = process.env.JWT_SECRET;

        if (!jwtSecret) {
            throw new Error("JWT secret not defined as an envrionment variable.");
        }

        const decodedToken = jwt.verify(token, jwtSecret) as { _id: string };

        if (decodedToken._id !== userId) {
            return NextResponse.json({ data: null, message: "Forbidden" }, { status: 403 });
        }

        const { db } = await connectToDb();

        const user = await db.collection('users').findOne({ _id: new ObjectId(userId) });

        if (!user) {
            return NextResponse.json({ data: null, message: "User not found." }, { status: 404 });
        }

        const { _id, isVerified, email, firstName, lastName, phoneNumber } = user;

        return NextResponse.json({
            data: {
                _id,
                isVerified: isVerified,
                email: email,
                firstName: firstName,
                lastName: lastName,
                phoneNumber: phoneNumber
            },
            message: "Found user."
        }, { status: 200 })

    } catch (error) {
        return NextResponse.json({ data: null, message: "Internal server error: " + error }, { status: 500 });
    }
}

export async function PUT(request: Request, { params }: { params: Promise<Params> }) {
    const authHeader = request.headers.get('Authorization');
    const token = authHeader?.split(' ')[1]; // Extract the token

    const { _id: userId } = await params;

    if (!token) {
        return NextResponse.json({
            data: null,
            message: "Unauthorized"
        }, { status: 401 });
    }

    try {
        const jwtSecret = process.env.JWT_SECRET;

        if (!jwtSecret) {
            throw new Error("JWT secret not defined as an envrionment variable.");
        }

        const decodedToken = jwt.verify(token, jwtSecret) as { _id: string };

        if (decodedToken._id !== userId) {
            return NextResponse.json({
                data: null,
                message: "Forbidden"
            }, { status: 403 });
        }

        const body = await request.json();

        const validationResult = saveUserProfileSchema.safeParse(body);

        if (!validationResult.success) {
            return NextResponse.json({ data: validationResult.error?.errors, message: "Validation failed." }, { status: 400 });
        }

        const { db } = await connectToDb();
        const { email, firstName, lastName, phoneNumber }: NewUser = body;
        const user = await db.collection('users').findOne({ email });

        if (!user) {
            return NextResponse.json({ data: null, message: "User not found." }, { status: 404 });
        }

        if (user.isVerified === false) {
            return NextResponse.json({ data: null, message: "User is not verified." }, { status: 403 });
        }

        const result = await db.collection("users").findOneAndUpdate(
            { _id: new ObjectId(userId) },
            {
                $set: {
                    email,
                    firstName,
                    lastName,
                    phoneNumber,
                }
            },
            { returnDocument: 'after' },
        );

        if (!result) {
            return NextResponse.json({
                data: null,
                message: "Failed to update user profile."
            }, { status: 500 });
        }

        const { _id: resultId, isVerified: resultIsVerified } = result;

        const newToken = jwt.sign({
            _id: resultId, isVerified: resultIsVerified,
            email: email
        }, jwtSecret, { expiresIn: '2d' });

        return NextResponse.json({
            data: {
                user: {
                    _id: resultId,
                    email,
                    isVerified: resultIsVerified,
                    firstName,
                    lastName,
                    phoneNumber,
                },
                token: newToken
            },
            message: "User profile updated."
        }, { status: 201 });

    } catch (error) {
        return NextResponse.json({
            data: null,
            message: "Internal server error: " + error
        }, { status: 500 });
    }
}