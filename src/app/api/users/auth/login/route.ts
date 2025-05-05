import { NextResponse } from "next/server";
import { connectToDb } from "../../../db";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import { loginUserSchema } from "@/util/loginUserSchema";

export async function POST(request: Request) {

    try {
        const body = await request.json();

        const validationResult = loginUserSchema.safeParse(body);
        if (!validationResult.success) {
            return NextResponse.json({ data: null, message: "Validation failed." }, { status: 400 });
        }

        const { db } = await connectToDb();
        const { email, password } = body;
        const user = await db.collection('users').findOne({ email });

        if (!user) {
            return NextResponse.json({ data: null, message: "Login failed." }, { status: 401 });
        }

        const { _id, isVerified, password: passwordHash } = user;

        const pepper = process.env.PEPPER_STRING;
        const isPasswordCorrect = await bcrypt.compare(password + pepper, passwordHash);
        const jwtSecret = process.env.JWT_SECRET;

        if (!jwtSecret) {
            throw new Error("JWT secret not defined as an environment variable.");
        }

        if (isPasswordCorrect) {
            if (isVerified) {

                const token = jwt.sign({ _id, isVerified: isVerified, email: email }, jwtSecret, { expiresIn: '2d' });

                return NextResponse.json({
                    data: {
                        user: {
                            _id,
                            isVerified
                        },
                        token
                    },
                    message: "User logged in successfully."
                }, { status: 201 });

            } else {
                return NextResponse.json({
                    data: {
                        user: {
                            _id,
                            isVerified
                        }
                    },
                    message: "User logged in but is not verified.",
                }, { status: 201 });
            }
        } else {
            return NextResponse.json({
                data: null,
                message: "User failed to log in."
            }, { status: 401 });
        }
    } catch (error) {
        return NextResponse.json({ data: null, message: "Internal server error: " + error }, { status: 500 });
    }
}