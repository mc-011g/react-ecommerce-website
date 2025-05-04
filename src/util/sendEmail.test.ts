import { EmailParams, sendEmail } from "./sendEmail";
import { v4 as uuid } from "uuid";
import { Resend } from "resend";
import React from "react";

const mockVerificationString = uuid();

const mockEmailInfo: EmailParams = {
    to: "email@email.com",
    from: "Test <onboarding@resend.dev>",
    subject: "Verify your email",
    firstName: "FirstName",
    message: `Thank you for registering. Please verify your email by clicking on this link: ${process.env.NEXT_PUBLIC_BASE_URL}/verifyEmail/${mockVerificationString}`,
};

jest.mock("resend");

jest.mock("../components/EmailTemplate", () => {
    const emailTemplate = jest.fn(() => React.createElement("div", null, "Test")); // Mock as a React element
    return { EmailTemplate: emailTemplate };
});

describe("sendEmail", () => {

    it("should successfully send an email to a user", async () => {
        const mockSend = jest.fn().mockResolvedValue({
            data: { id: "email-id-123" },
            error: null,
        });

        const mockResend = { emails: { send: mockSend } } as unknown as Resend;

        const response = await sendEmail(mockEmailInfo, mockResend);

        expect(mockSend).toHaveBeenCalledTimes(1);

        expect(mockSend).toHaveBeenCalledWith(
            expect.objectContaining({
                from: mockEmailInfo.from,
                to: mockEmailInfo.to,
                subject: mockEmailInfo.subject,
                react: React.createElement("div", null, "Test"),
            })
        );
        expect(response).toEqual({ id: "email-id-123" });
    });
});