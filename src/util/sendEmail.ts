import { EmailTemplate } from "@/components/EmailTemplate";
import { CreateEmailResponseSuccess, Resend } from 'resend';

export interface EmailParams {
  to: string;
  from: string;
  subject: string;
  firstName: string;
  message: string;
}

export async function sendEmail({ to, from, subject, firstName, message }: EmailParams, resend: Resend): Promise<CreateEmailResponseSuccess | null> {
  try {
    const { data, error } = await resend.emails.send({
      from,
      to,
      subject,
      react: await EmailTemplate({ firstName, message }),
    });

    if (error) {
      throw new Error(String(error));
    }

    return data;

  } catch (error) {
    throw new Error(String(error));
  }
}