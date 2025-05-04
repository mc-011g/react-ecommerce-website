import { NextResponse } from "next/server";
import { sendEmail } from "@/util/sendEmail";
import { connectToDb } from "@/app/api/db";
import { v4 as uuid } from "uuid";
import { Resend } from "resend";

export async function POST(request: Request) {

    try {
        const resend = new Resend(process.env.RESEND_API_KEY);

        const { email } = await request.json();

        if (!email) {
            return NextResponse.json({ data: null, message: "No email provided." }, { status: 400 });
        }

        const passwordResetCode = uuid();

        const { db } = await connectToDb();

        const user = await db.collection('users').findOneAndUpdate({ email }, {
            $set: {
                passwordResetCode,
            },
        },
            { returnDocument: "after" });

        if (!user) {
            return NextResponse.json({ data: null, message: "No user exists." }, { status: 404 });
        }

        const { firstName } = user;

        try {
            await sendEmail({
                to: email,
                from: "Test <onboarding@resend.dev>",
                subject: "Forgot password reset",
                firstName,
                message: `Please go to this link to reset your password: ${process.env.NEXT_PUBLIC_BASE_URL}/resetPassword/${passwordResetCode}`,
            }, resend);
        } catch (error) {
            throw new Error("Email error: " + error);
        }

        return NextResponse.json({ data: true, message: "Forgot password email sent successfully" }, { status: 200 });

    } catch (error) {
        return NextResponse.json({ data: null, message: "Internal server error: " + error }, { status: 500 });
    }
}