import { NextResponse } from "next/server";
import { connectToDb } from "../../../db";
import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";
import { registerUserSchema } from "@/util/registerUserSchema";
import { sendEmail } from "@/util/sendEmail";
import { Resend } from "resend";
import { NewUser } from "@/types/types";

export async function POST(request: Request) {

    try {
        const body = await request.json();
        const validationResult = registerUserSchema.safeParse(body);

        if (!validationResult.success) {
            return NextResponse.json({ data: validationResult.error?.errors, message: "Validation failed." }, { status: 400 });
        }

        const { db } = await connectToDb();
        const { email, firstName, lastName, phoneNumber, password }: NewUser = body;
        const user = await db.collection('users').findOne({ email });

        if (user) {
            return NextResponse.json({ data: null, message: "User with this email already exists" }, { status: 409 });
        }

        const pepper = process.env.PEPPER_STRING;
        const verificationString = uuid();
        const jwtSecret = process.env.JWT_SECRET;

        if (!jwtSecret) {
            throw new Error("JWT secret not defined as an environment variable.");
        }

        const passwordHash = await bcrypt.hash(password + pepper, 10);

        const newUser = {
            email,
            firstName,
            lastName,
            phoneNumber,
            password: passwordHash,
            verificationString,
            isVerified: false,
        }

        await db.collection("users").insertOne(newUser);

        const resend = new Resend(process.env.RESEND_API_KEY);

        try {
            await sendEmail({
                to: email,
                from: "matthew@matthewcarmichael.pro",
                subject: "Verify your email",
                firstName,
                message: `Thank you for registering. Please verify your email by clicking on this link: ${process.env.NEXT_PUBLIC_BASE_URL}/verifyEmail/${verificationString}`,
            }, resend
            );
        } catch (error) {
            throw new Error("Email error: " + error);
        }

        return NextResponse.json({
            data: null,
            message: "User created successfully."
        }, { status: 201 });

    } catch (error) {
        return NextResponse.json({
            data: null,
            message: "Internal server error: " + error
        }, { status: 500 });
    }
}