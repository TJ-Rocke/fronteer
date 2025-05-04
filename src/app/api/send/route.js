import { EmailTemplate } from "@/components/email-template";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req) {
  const body = await req.json();
  try {
    const { data, error } = await resend.emails.send({
      from: "thomas.rocke@fronteer.dev",
      to: [body.email],
      // to: "test-x90x9dc08@srv1.mail-tester.com",
      subject: "Welcome to Fronteer!",
      react: EmailTemplate({ firstName: body.firstName }),
    });

    if (error) {
      return Response.json({ error }, { status: 500 });
    }

    return Response.json(data);
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
