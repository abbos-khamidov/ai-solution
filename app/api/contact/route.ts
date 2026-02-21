import { NextResponse } from "next/server";
import { sendTelegram, fmtContact } from "@/lib/telegram";

function getBackendUrl(): string | null {
  const url = process.env.DJANGO_API_BASE_URL?.trim();
  return url ? url.replace(/\/+$/, '') : null;
}

export async function POST(request: Request) {
  const bodyText = await request.text();

  // Send Telegram notification immediately — don't wait for backend
  try {
    const data = JSON.parse(bodyText);
    await sendTelegram(fmtContact(data));
  } catch {
    // ignore parse errors
  }

  const backendUrl = getBackendUrl();
  if (!backendUrl) {
    // Backend not configured but we still got the lead via Telegram
    return NextResponse.json({ success: true });
  }

  try {
    const response = await fetch(`${backendUrl}/api/contact`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Forwarded-For": request.headers.get("x-forwarded-for") ?? "",
        "User-Agent": request.headers.get("user-agent") ?? "",
      },
      body: bodyText,
      cache: "no-store",
    });

    const text = await response.text();
    try {
      return NextResponse.json(JSON.parse(text), { status: response.status });
    } catch {
      return NextResponse.json({ error: text || "Bad backend response" }, { status: response.status });
    }
  } catch {
    return NextResponse.json({ error: "Backend unavailable" }, { status: 502 });
  }
}
