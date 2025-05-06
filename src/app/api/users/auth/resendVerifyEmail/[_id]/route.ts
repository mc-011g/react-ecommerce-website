import { connectToDb } from "@/app/api/db";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";
import { v4 as uuid } from "uuid";
import { sendEmail } from "@/util/sendEmail";
import { Resend } from "resend";

type Params = {
    _id: string;
}

export async function PUT(request: Request, { params }: { params: Promise<Params> }) {

    const { _id: userId } = await params;

    try {
        const { db } = await connectToDb();

        const result = await db.collection('users').findOne({ _id: new ObjectId(userId) });

        if (!result) {
            return NextResponse.json({ data: null, message: "Failed to resend email verification code." }, { status: 500 });
        }

        const { _id, email, firstName, isVerified } = result;

        if (isVerified) {
            return NextResponse.json({ data: null, message: "User is already verified." }, { status: 500 });
        }

        const verificationString = uuid();

        await db.collection('users').updateOne({ _id: new ObjectId(_id) }, {
            $set: {
                verificationString: verificationString,
            }
        });

        const resend = new Resend(process.env.RESEND_API_KEY);

        try {
            await sendEmail({
                to: email,
                from: "matthew@matthewcarmichael.pro",
                subject: "Verify your email",
                firstName,
                message: `Please verify your email by clicking on this link: ${process.env.NEXT_PUBLIC_BASE_URL}/verifyEmail/${verificationString}`,
            }, resend
            );
        } catch (error) {
            throw new Error("Email error: " + error);
        }

        return NextResponse.json({ data: null, message: "Verification email resent successfully." }, { status: 200 });

    } catch (error) {
        return NextResponse.json({ data: null, message: "Internal server error: " + error }, { status: 500 });
    }
}