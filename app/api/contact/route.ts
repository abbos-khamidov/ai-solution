import { NextResponse } from "next/server";

function getBackendUrl(): string | null {
  const url = process.env.DJANGO_API_BASE_URL?.trim();
  return url ? url.replace(/\/+$/, '') : null;
}

export async function POST(request: Request) {
  const backendUrl = getBackendUrl();
  if (!backendUrl) {
    return NextResponse.json(
      { error: 'Backend not configured', code: 'BACKEND_MISSING' },
      { status: 503 }
    );
  }

  try {
    const body = await request.text();
    const response = await fetch(`${backendUrl}/api/contact`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Forwarded-For": request.headers.get("x-forwarded-for") ?? "",
        "User-Agent": request.headers.get("user-agent") ?? "",
      },
      body,
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