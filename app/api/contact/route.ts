import { NextResponse } from "next/server";
import { contactSchema } from "@/lib/schema/contact";
import { sendToTelegram } from "@/lib/integrations/telegram";
import { sendWithResend } from "@/lib/integrations/email";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    if (body.website && String(body.website).trim() !== '') {
      return NextResponse.json({ ok: true });
    }
    const parsed = contactSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid data", issues: parsed.error.issues }, { status: 400 });
    }

    const data = parsed.data;
    const [telegramResult, emailResult] = await Promise.allSettled([
      sendToTelegram(data),
      sendWithResend({
        to: process.env.LEADS_EMAIL_TO || data.email,
        subject: "New contact form submission",
        html: `
          <h2>New Contact</h2>
          <p><strong>Name:</strong> ${data.name}</p>
          <p><strong>Email:</strong> ${data.email}</p>
          ${data.message ? `<p><strong>Message:</strong> ${data.message}</p>` : ''}
        `
      })
    ]);

    const telegramOk = telegramResult.status === "fulfilled" && telegramResult.value.ok;
    const emailOk = emailResult.status === "fulfilled" && emailResult.value.ok;

    if (!telegramOk && !emailOk) {
      return NextResponse.json({ error: "Delivery failed" }, { status: 502 });
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Unexpected error" }, { status: 500 });
  }
}
