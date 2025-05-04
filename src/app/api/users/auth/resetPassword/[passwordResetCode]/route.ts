import { NextResponse } from "next/server";
import { connectToDb } from "../../../../db";
import bcrypt from "bcrypt";

type Params = {
    passwordResetCode: string;
}

export async function PUT(request: Request, { params }: { params: Promise<Params> }) {

    try {
        const body = await request.json();

        const { passwordResetCode } = await params;
        const { newPassword } = body;

        if (!passwordResetCode) {
            return NextResponse.json({ data: null, message: "Password reset failed." }, { status: 400 });
        }

        const pepper = process.env.PEPPER_STRING;
        const newPasswordHash = await bcrypt.hash(newPassword + pepper, 10);

        const { db } = await connectToDb();

        const user = await db.collection('users').findOneAndUpdate({ passwordResetCode }, {
            $set: {
                password: newPasswordHash
            },
            $unset: {
                passwordResetCode: ""
            }
        });

        if (!user) {
            return NextResponse.json({ data: null, message: "No user exists." }, { status: 404 });
        }

        return NextResponse.json({
            data: null,
            message: "Password reset successfully",
        }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ data: null, message: "Internal server error: " + error }, { status: 500 });
    }
}